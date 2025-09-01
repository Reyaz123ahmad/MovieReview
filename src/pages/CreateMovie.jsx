


// import React, { useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { moviesAPI } from '../services/movies';
// import { useNavigate } from 'react-router-dom';
// //import './CreateMovie.css';

// const CreateMovie = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     genre: '',
//     releaseYear: '',
//     director: '',
//     cast: '',
//     synopsis: '',
//   });
//   const [posterFile, setPosterFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const { currentUser } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleFileChange = (e) => {
//     setPosterFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (currentUser.accountType.toLowerCase() !== 'admin') {
//       setError('Only admins can create movies');
//       return;
//     }

//     const data = new FormData();
//     data.append('title', formData.title);
//     data.append('releaseYear', Number(formData.releaseYear));
//     data.append('director', formData.director);
//     data.append('synopsis', formData.synopsis);

//     const genres = formData.genre.split(',').map(g => g.trim());
//     const castList = formData.cast.split(',').map(c => c.trim());

//     genres.forEach(g => data.append('genre[]', g));
//     castList.forEach(c => data.append('cast[]', c));

//     if (posterFile) {
//       data.append('imageFile', posterFile);
//     }

//     try {
//       setLoading(true);
//       const response = await moviesAPI.create(data);
//       if (response.data.success) {
//         alert('Movie created successfully!');
//         navigate('/movies');
//       } else {
//         setError(response.data.message || 'Failed to create movie');
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="form-container">
//       <h1 className="form-title">Create New Movie</h1>

//       {error && <div className="error-message">{error}</div>}

//       <form onSubmit={handleSubmit} className="movie-form">
//         <label>
//           Title
//           <input type="text" name="title" value={formData.title} onChange={handleChange} required />
//         </label>

//         <label>
//           Genre (comma separated)
//           <input type="text" name="genre" value={formData.genre} onChange={handleChange} required />
//         </label>

//         <label>
//           Release Year
//           <input type="number" name="releaseYear" value={formData.releaseYear} onChange={handleChange} min="1900" max="2030" required />
//         </label>

//         <label>
//           Director
//           <input type="text" name="director" value={formData.director} onChange={handleChange} required />
//         </label>

//         <label>
//           Cast (comma separated)
//           <input type="text" name="cast" value={formData.cast} onChange={handleChange} required />
//         </label>

//         <label>
//           Synopsis
//           <textarea name="synopsis" value={formData.synopsis} onChange={handleChange} rows="4" required />
//         </label>

//         <label>
//           Poster Image
//           <input type="file" name="imageFile" onChange={handleFileChange} accept="image/*" required />
//         </label>

//         {posterFile && (
//           <img src={URL.createObjectURL(posterFile)} alt="Poster Preview" className="poster-preview" />
//         )}

//         <button type="submit" disabled={loading}>
//           {loading ? 'Creating Movie...' : 'Create Movie'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateMovie;




import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { moviesAPI } from '../services/movies';
import { useNavigate } from 'react-router-dom';
import './CreateMovie.css';

const CreateMovie = () => {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    releaseYear: '',
    director: '',
    cast: '',
    synopsis: '',
  });
  const [posterFile, setPosterFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setPosterFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentUser.accountType.toLowerCase() !== 'admin') {
      setError('Only admins can create movies');
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('releaseYear', Number(formData.releaseYear));
    data.append('director', formData.director);
    data.append('synopsis', formData.synopsis);

    const genres = formData.genre.split(',').map(g => g.trim());
    const castList = formData.cast.split(',').map(c => c.trim());

    genres.forEach(g => data.append('genre[]', g));
    castList.forEach(c => data.append('cast[]', c));

    if (posterFile) {
      data.append('imageFile', posterFile);
    }

    try {
      setLoading(true);
      const response = await moviesAPI.create(data);
      if (response.data.success) {
        alert('Movie created successfully!');
        navigate('/movies');
      } else {
        setError(response.data.message || 'Failed to create movie');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Create New Movie</h1>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="movie-form">
        <label>
          Title
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </label>

        <label>
          Genre (comma separated)
          <input type="text" name="genre" value={formData.genre} onChange={handleChange} required />
        </label>

        <label>
          Release Year
          <input type="number" name="releaseYear" value={formData.releaseYear} onChange={handleChange} min="1900" max="2030" required />
        </label>

        <label>
          Director
          <input type="text" name="director" value={formData.director} onChange={handleChange} required />
        </label>

        <label>
          Cast (comma separated)
          <input type="text" name="cast" value={formData.cast} onChange={handleChange} required />
        </label>

        <label>
          Synopsis
          <textarea name="synopsis" value={formData.synopsis} onChange={handleChange} rows="4" required />
        </label>

        <label>
          Poster Image
          <input type="file" name="imageFile" onChange={handleFileChange} accept="image/*" required />
        </label>

        {posterFile && (
          <img src={URL.createObjectURL(posterFile)} alt="Poster Preview" className="poster-preview" />
        )}

        <button type="submit" disabled={loading}>
          {loading ? 'Creating Movie...' : 'Create Movie'}
        </button>
      </form>
    </div>
  );
};

export default CreateMovie;
