// import React, { useState } from 'react';
// import { usersAPI } from '../services/users';
// import { useParams } from 'react-router-dom';

// const UpdateUserProfile = () => {
//   const { id } = useParams();
//   const [formData, setFormData] = useState({ username: ""});
//   const [profilePicture, setProfilePicture] = useState(null);
//   const [message, setMessage] = useState('');

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleFileChange = (e) => {
//     setProfilePicture(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     data.append('username', formData.username);
    
//     if (profilePicture) {
//       data.append('profilePicture', profilePicture);
//     }

//     try {
//       const res = await usersAPI.updateWithImage(id, data);
//       setMessage(res.data.message);
//     } catch (err) {
//       setMessage(err.response?.data?.message || 'Update failed');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} encType="multipart/form-data">
//       <input name="username" value={formData.username} onChange={handleChange} required />
      
//       <input type="file" accept="image/*" onChange={handleFileChange} />
//       <button type="submit">Update Profile</button>
//       {message && <p>{message}</p>}
//     </form>
//   );
// };

// export default UpdateUserProfile;


import React, { useState } from 'react';
import { usersAPI } from '../services/users';
import { useParams } from 'react-router-dom';
import './UpdateUserProfile.css';

const UpdateUserProfile = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ username: "" });
  const [profilePicture, setProfilePicture] = useState(null);
  const [message, setMessage] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    
    // Create a preview URL for the image
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('username', formData.username);
    
    if (profilePicture) {
      data.append('profilePicture', profilePicture);
    }

    try {
      const res = await usersAPI.updateWithImage(id, data);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="update-profile-container">
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="update-profile-form">
        <h2 className="update-profile-title">Update Profile</h2>
        
        <div className="form-group">
          <label htmlFor="username" className="form-label">Username</label>
          <input 
            id="username"
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            className="form-input"
            required 
          />
        </div>
        
        <div className="file-input-container">
          <label htmlFor="profilePicture" className="file-input-label">Profile Picture</label>
          <input 
            id="profilePicture"
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            className="file-input"
          />
        </div>

        {previewUrl && (
          <div className="image-preview">
            <img src={previewUrl} alt="Preview" className="preview-image" />
          </div>
        )}
        
        <button type="submit" className="submit-button">Update Profile</button>
        
        {message && (
          <div className={`message ${message.includes('failed') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default UpdateUserProfile;
