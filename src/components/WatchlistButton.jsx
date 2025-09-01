import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { watchlistAPI } from '../services/watchlist';

const WatchlistButton = ({ movieId }) => {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      checkWatchlistStatus();
    }
  }, [currentUser, movieId]);

  const checkWatchlistStatus = async () => {
    try {
      const response = await watchlistAPI.check(currentUser.id, movieId);
      setIsInWatchlist(response.data.isInWatchlist);
    } catch (error) {
      console.error('Error checking watchlist status:', error);
    }
  };

  const handleWatchlistToggle = async () => {
    if (!currentUser) {
      alert('Please login to manage your watchlist');
      return;
    }

    setLoading(true);
    try {
      if (isInWatchlist) {
        await watchlistAPI.remove(currentUser.id, movieId);
        setIsInWatchlist(false);
      } else {
        await watchlistAPI.add(currentUser.id, movieId);
        setIsInWatchlist(true);
      }
    } catch (error) {
      console.error('Error updating watchlist:', error);
      alert('Failed to update watchlist');
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) return null;

  return (
    <button
      onClick={handleWatchlistToggle}
      disabled={loading}
      className={`flex items-center px-4 py-2 rounded-lg transition ${
        isInWatchlist
          ? 'bg-red-100 text-red-600 hover:bg-red-200'
          : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
      } disabled:opacity-50`}
    >
      {loading ? (
        <span>Processing...</span>
      ) : isInWatchlist ? (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Remove from Watchlist
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          Add to Watchlist
        </>
      )}
    </button>
  );
};

export default WatchlistButton;
