import { useState, useEffect, lazy, Suspense } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext' // Import the auth context
import './css/App.css'
import './css/mediaq.css'
import './css/footer.css'
// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
// Components
import { getData } from './api/apiconfig'
import { getGenreName } from './components/GenreData'
const MovieCard = lazy(() => import('./components/MovieCard'));
const Celebrity = lazy(() => import('./components/Celebrity'));
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [trendWeek, settrendWeek] = useState([])
  const [trailerUrl, setTrailerUrl] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);
  const { isAuthenticated } = useAuth()
  const imgURL = 'https://image.tmdb.org/t/p/original/'

  useEffect(() => {
    const url = '/trending/movie/week?language=en-US'
    getData(url).then((data) => { settrendWeek(data.results) })
  }, [])

  const handleTrailerClick = async (movieId) => {
    try {
      const trailerData = await getData(`/movie/${movieId}/videos?language=en-US`);
      const trailer = trailerData.results?.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      
      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
        setShowTrailer(true);
      } else {
        alert("No trailer available for this movie");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
      alert("Error loading trailer");
    }
  };

  // Check both isAuthenticated and token
  const hasToken = localStorage.getItem('token') !== null;
  if (!isAuthenticated && !hasToken) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <Navbar  /> {/* Pass logout function to Navbar */}

      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {trendWeek.length > 0 ? (
          trendWeek.map(item => (
            <SwiperSlide key={item.id}>
              <div className="swipe-head">
                <picture>
                  <source srcSet={`${imgURL}${item.backdrop_path}.webp`} type="image/webp" />
                  <img 
                    src={`${imgURL}${item.backdrop_path}`} 
                    alt="img.jpg" 
                    srcSet={`${imgURL}${item.backdrop_path}?w=320 320w, 
                            ${imgURL}${item.backdrop_path}?w=640 640w, 
                            ${imgURL}${item.backdrop_path}?w=1280 1280w`}
                    sizes="(max-width: 768px) 320px, (max-width: 1200px) 640px, 1280px"
                    className='head-img'
                  />
                </picture>
                <div className="head-data">
                  <div className="genreType">
                    <p>{getGenreName(item.genre_ids[0])} | {getGenreName(item.genre_ids[1])} {item.genre_ids[2] ? `| ${getGenreName(item.genre_ids[2])}` : ""}</p>
                  </div>
                  <div className="movieName">
                    <h1>{item.title}</h1>
                  </div>
                  <div className="movieInfo">
                    <p><span>Imdb Rating:</span> {item.vote_average.toFixed(1)} </p>
                    <p><span>Release Data:</span> {item.release_date}</p>
                  </div>
                  <div className="btnTrailer">
                    <Link to={`/movies/${item.id}`}>
                      <button>View Description</button>
                    </Link>
                    <button onClick={() => handleTrailerClick(item.id)}>
                      <i className="fa-solid fa-play"></i> Watch Trailer
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <div className='loading'>Loading data...</div>
        )}
      </Swiper>

      {showTrailer && (
        <div className="trailer-modal">
          <iframe
            width="560"
            height="315"
            src={trailerUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <button onClick={() => setShowTrailer(false)}>Close Trailer</button>
        </div>
      )}

      <Suspense fallback={<div>Loading...</div>}>
        <MovieCard title="Now Playing in Theaters" type="movie" url='/movie/now_playing?language=en-US&page=1' />
        <MovieCard title="Upcoming Movies" type="movie" url='/movie/upcoming?language=en-US&page=1' />
        <MovieCard title="Trending Now" type="movie" url='/trending/movie/day?language=en-US' />
        <MovieCard title="Top Box Office" type="movie" url='/discover/movie?language=en-US&page=1&sort_by=revenue.desc&year=2024' />
        <Celebrity title="Popular Celebrities" url='/person/popular?language=en-US&page=1' />
        
        <MovieCard title="Action & Adventure" type="movie" url='/discover/movie?with_genres=28,12&language=en-US&page=1&sort_by=popularity.desc' />
        <MovieCard title="Comedy Hits" type="movie" url='/discover/movie?with_genres=35&language=en-US&page=1&sort_by=popularity.desc' />
        <MovieCard title="Science Fiction" type="movie" url='/discover/movie?with_genres=878&language=en-US&page=1&sort_by=popularity.desc' />
        <MovieCard title="Horror Movies" type="movie" url='/discover/movie?with_genres=27&language=en-US&page=1&sort_by=popularity.desc' />
        <MovieCard title="Romance" type="movie" url='/discover/movie?with_genres=10749&language=en-US&page=1&sort_by=popularity.desc' />
        <MovieCard title="Family Movies" type="movie" url='/discover/movie?with_genres=10751&language=en-US&page=1&sort_by=popularity.desc' />
        <MovieCard title="Animated Features" type="movie" url='/discover/movie?with_genres=16&language=en-US&page=1&sort_by=popularity.desc' />
        <MovieCard title="Mystery & Thriller" type="movie" url='/discover/movie?with_genres=9648,53&language=en-US&page=1&sort_by=popularity.desc' />
        <MovieCard title="Award Winning Films" type="movie" url='/discover/movie?language=en-US&page=1&sort_by=vote_average.desc&vote_count.gte=1000' />
        
        <MovieCard title="Popular TV Shows" type="tv" url='/tv/popular?language=en-US&page=1' />
        <MovieCard title="Top Rated Series" type="tv" url='/tv/top_rated?language=en-US&page=1' />
        <MovieCard title="Currently Airing TV Shows" type="tv" url='/tv/on_the_air?language=en-US&page=1' />
        <MovieCard title="TV Shows Airing Today" type="tv" url='/tv/airing_today?language=en-US&page=1' />
        
      </Suspense>
   


      <Footer />
    </div>
  )
}

export default App