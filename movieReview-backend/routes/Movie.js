const express = require("express");
const router = express.Router();

const {
    createMovie,
    getAllMovies,
    getMovieById
} = require("../controller/Movie");

const { auth, isAdmin } = require("../middlewares/auth");

router.post("/createMovie", auth, isAdmin, createMovie);
router.get("/getAllMovies", getAllMovies)
router.get("/getMovie/:id", getMovieById)

module.exports = router;