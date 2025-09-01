const Movie = require("../models/MovieSchema");
const User = require("../models/UserSchema");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
exports.createMovie = async (req, res) => {
  try {
    // Check if user is Admin
    if (req.user.accountType !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "Only Admins can create movies"
      });
    }

    const userId = req.user._id;
    const posterFile = req.files?.imageFile;

    // Extract and normalize fields
    const title = req.body.title?.trim();
    const releaseYear = Number(req.body.releaseYear);
    const director = req.body.director?.trim();
    const synopsis = req.body.synopsis?.trim();

    let genre = req.body['genre[]'];
    let cast = req.body['cast[]'];

    // Normalize genre and cast to arrays
    if (!Array.isArray(genre)) genre = [genre];
    if (!Array.isArray(cast)) cast = [cast];

    // Validate required fields
    if (
      !title ||
      !genre.length ||
      !releaseYear ||
      !director ||
      !cast.length ||
      !synopsis ||
      !posterFile
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      });
    }

    // Upload poster to Cloudinary
    const uploadDetails = await uploadImageToCloudinary(
      posterFile,
      process.env.FOLDER_NAME
    );

    // Create new Movie
    const newMovie = await Movie.create({
      title,
      genre,
      releaseYear,
      director,
      cast,
      synopsis,
      createdBy: userId,
      posterUrl: uploadDetails.secure_url,
    });

    // Populate createdBy field
    const newMovieDetails = await Movie.findById(newMovie._id)
      .populate("createdBy", "username email");

    console.log("New Movie Created:", newMovieDetails);

    res.status(200).json({
      success: true,
      data: newMovieDetails,
      message: "Movie Created Successfully",
    });
  } catch (error) {
    console.error("Create Movie Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Movie",
      error: error.message,
    });
  }
};



// get all movies and filtering
exports.getAllMovies = async (req, res) => {
  try {
    const { page = 1, limit = 10, genre, releaseYear, director } = req.query;

    const filter = {};
    if (genre) filter.genre = genre;
    if (releaseYear) filter.releaseYear = releaseYear;
    if (director) filter.director = director;

    const movies = await Movie.find(filter)
      .populate("createdBy", "username email")
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .exec();

    const total = await Movie.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: movies,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch movies",
      error: error.message,
    });
  }
};

// get movie by id

exports.getMovieById = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findById(id)
      .populate("createdBy", "username email")
      .populate({
        path:'reviews',
        populate:{
            path:'userId',
            select:'name email'
        }
      })

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    res.status(200).json({
      success: true,
      data: movie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch movie",
      error: error.message,
    });
  }
};

