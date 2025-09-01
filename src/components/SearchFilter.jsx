



// import React from 'react';
// //import './SearchFilter.css'; // External CSS file

// const SearchFilter = ({ filters, onFilterChange, onSearch }) => {
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     onFilterChange(name, value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSearch();
//   };

//   return (
//     <div className="filter-container">
//       <h3 className="filter-heading">Filter Movies</h3>
//       <form onSubmit={handleSubmit}>
//         <div className="filter-grid">
//           <div className="filter-group">
//             <label className="filter-label">Title</label>
//             <input
//               type="text"
//               name="title"
//               value={filters.title || ''}
//               onChange={handleChange}
//               className="filter-input"
//               placeholder="Search by title"
//             />
//           </div>
//           <div className="filter-group">
//             <label className="filter-label">Genre</label>
//             <select
//               name="genre"
//               value={filters.genre || ''}
//               onChange={handleChange}
//               className="filter-input"
//             >
//               <option value="">All Genres</option>
//               <option value="Action">Action</option>
//               <option value="Comedy">Comedy</option>
//               <option value="Drama">Drama</option>
//               <option value="Horror">Horror</option>
//               <option value="Sci-Fi">Sci-Fi</option>
//               <option value="Romance">Romance</option>
//               <option value="Thriller">Thriller</option>
//               <option value="Documentary">Documentary</option>
//             </select>
//           </div>
//           <div className="filter-group">
//             <label className="filter-label">Year</label>
//             <input
//               type="number"
//               name="releaseYear"
//               value={filters.releaseYear || ''}
//               onChange={handleChange}
//               className="filter-input"
//               placeholder="Release Year"
//               min="1900"
//               max="2030"
//             />
//           </div>
//           <div className="filter-group">
//             <label className="filter-label">Director</label>
//             <input
//               type="text"
//               name="director"
//               value={filters.director || ''}
//               onChange={handleChange}
//               className="filter-input"
//               placeholder="Director name"
//             />
//           </div>
//         </div>
//         <div className="filter-actions">
//           <button type="submit" className="filter-button">
//             Apply Filters
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SearchFilter;


import React from 'react';
import './SearchFilter.css'; // External CSS file

const SearchFilter = ({ filters, onFilterChange, onSearch }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="filter-container">
      <h3 className="filter-heading">Filter Movies</h3>
      <form onSubmit={handleSubmit}>
        <div className="filter-grid">
          <div className="filter-group">
            <label className="filter-label">Title</label>
            <input
              type="text"
              name="title"
              value={filters.title || ''}
              onChange={handleChange}
              className="filter-input"
              placeholder="Search by title"
            />
          </div>
          <div className="filter-group">
            <label className="filter-label">Genre</label>
            <select
              name="genre"
              value={filters.genre || ''}
              onChange={handleChange}
              className="filter-input"
            >
              <option value="">All Genres</option>
              <option value="Action">Action</option>
              <option value="Comedy">Comedy</option>
              <option value="Drama">Drama</option>
              <option value="Horror">Horror</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Romance">Romance</option>
              <option value="Thriller">Thriller</option>
              <option value="Documentary">Documentary</option>
            </select>
          </div>
          <div className="filter-group">
            <label className="filter-label">Year</label>
            <input
              type="number"
              name="releaseYear"
              value={filters.releaseYear || ''}
              onChange={handleChange}
              className="filter-input"
              placeholder="Release Year"
              min="1900"
              max="2030"
            />
          </div>
          <div className="filter-group">
            <label className="filter-label">Director</label>
            <input
              type="text"
              name="director"
              value={filters.director || ''}
              onChange={handleChange}
              className="filter-input"
              placeholder="Director name"
            />
          </div>
        </div>
        <div className="filter-actions">
          <button type="submit" className="filter-button">
            Apply Filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchFilter;
