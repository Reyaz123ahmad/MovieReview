import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MovieProvider } from './context/MovieContext';
import Header from './components/Header';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateMovie from './pages/CreateMovie';
import './App.css';
import UpdateUserProfile from './pages/UpdateUserProfile';

function App() {
  return (
    <AuthProvider>
      <MovieProvider>
        <Router>
          <div className="App min-h-screen bg-gray-50">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/movie/:id" element={<MovieDetail />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/create-movie" element={<CreateMovie />} />
                <Route path="/update-userProfile/:id" element={<UpdateUserProfile />} />
              </Routes>
            </main>
          </div>
        </Router>
      </MovieProvider>
    </AuthProvider>
  );
}

export default App;
