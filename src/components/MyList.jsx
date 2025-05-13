import { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import MovieCard from './MovieCard';
import Navbar from './Navbar';
import '../css/MyList.css';
import '../css/App.css';
import Footer from './Footer';

const MyList = () => {
  const { user, isAuthenticated } = useAuth();
  const [myList, setMyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendAvailable, setRecommendAvailable] = useState(false);

  useEffect(() => {
    const fetchMyList = async () => {
      try {
        if (!isAuthenticated) {
          setLoading(false);
          return;
        }

        const response = await fetch('https://mv-backend-k53w.onrender.com/api/my-list', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch your list');
        }

        const data = await response.json();
        setMyList(data);
        setRecommendAvailable(data.length > 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyList();
  }, [isAuthenticated, user]); // Re-fetch when auth status changes

  const firstMovieId = myList.length > 0 ? myList[0].movieId : null;
  const recommend = firstMovieId 
    ? `/movie/${firstMovieId}/recommendations?language=en-US&page=1` 
    : null;

  if (!isAuthenticated) {
    return (
      <div className="my-list-container">
        <Navbar />
        <div className="head">
          <h2>My List</h2>
        </div>
        <p>Please login to view your list</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="my-list-container">
        <Navbar />
        <div className="head">
          <h2>My List</h2>
        </div>
        <p>Loading your list...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-list-container">
        <Navbar />
        <div className="head">
          <h2>My List</h2>
        </div>
        <p className="error">{error}</p>
      </div>
    );
  }

  return (
    <div className="my-list-container">
      <Navbar />
      <div className="head">
        <h2>My List</h2>
      </div>
      
      {myList.length === 0 ? (
        <div className="empty-list">
          <p>You haven't added anything to My List.</p>
        </div>
      ) : (
        <>
          <div className="my-list-movies">
            {myList.map((movie) => (
              <div key={movie.movieId} className="movie-item">
                <img
                  src={movie.posterPath 
                    ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
                    : '/placeholder.jpg'}
                  alt={movie.title}
                  className="movie-poster"
                />
                <h3 className="movie-title">{movie.title}</h3>
              </div>
            ))}
          </div>

          {recommendAvailable && (
            <div className="recommendations">
              {/* <h3>Because you liked {myList[0].title}</h3> */}
              <div className="recommendmov">
                <MovieCard 
                  title="Recommended Movies" 
                  type="movie" 
                  url={recommend} 
                />
              </div>
            </div>
          )}
        </>
      )}
      <Footer />
    </div>
  );
};

export default MyList;