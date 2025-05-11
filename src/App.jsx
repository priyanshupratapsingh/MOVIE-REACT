import { useState, useEffect,lazy, Suspense } from 'react'
import './css/App.css'
import './css/mediaq.css'
// !--- swiper imports down below ---!
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay, Pagination } from 'swiper/modules';
// !-------------------------------!
import { getData } from './api/apiconfig'
import { getGenreName } from './components/GenreData'
const MovieCard = lazy(() => import('./components/MovieCard'));
const Celebrity = lazy(() => import('./components/Celebrity'));
import Navbar from './components/Navbar';

// 1. added <link stylesheet> from font awesome cdn for icons such as: search, cross, hamburger etc 
// 2. installed swiper by- npm i swiper then imported then above.
function App() {
  const [trendWeek, settrendWeek] = useState([])

  const imgURL = 'https://image.tmdb.org/t/p/original/'
  useEffect(() => {
    const url = '/trending/movie/week?language=en-US'

    getData(url).then((data) => { settrendWeek(data.results) 
      console.log(data.results)
    })
    
  }, [])

  return (
    <div>
      <Navbar/>

      <Swiper
        spaceBetween={30}
        // loop={true}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >

        {trendWeek.length > 0 ? (
          <div className='h'>
            {trendWeek.map(item => {
              return <SwiperSlide key={item.id}>
                <div className="swipe-head">
                <picture>
  <source srcSet={`${imgURL}${item.backdrop_path}.webp`} type="image/webp" />
  <img 
    src={`${imgURL}${item.backdrop_path}`} 
    alt="img.jpg" 
    // loading="lazy"
    srcset={`${imgURL}${item.backdrop_path}?w=320 320w, 
    ${imgURL}${item.backdrop_path}?w=640 640w, 
    ${imgURL}${item.backdrop_path}?w=1280 1280w`}
sizes="(max-width: 768px) 320px, (max-width: 1200px) 640px, 1280px"
    className='head-img'
  />
</picture>
                  {/* <div class="fade-effect"></div> */}
                  <div className="head-data">
                    {/* getGenreName is a Function imported from GenreData.jsx*/}
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
                    <Link to={`/movies/${item.id}`}  > <button>View Description</button> </Link>
                      
                      <button><i class="fa-solid fa-play"></i> Watch Trailer</button>
                    </div>
                  </div>

                </div>
              </SwiperSlide>
            }
            )}
          </div >
        ) : (
          <div className='loading'>Loading data...</div>
        )}
      </Swiper>
      <Suspense fallback={<div>Loading...</div>}>
      <MovieCard title="trending now" type="movie" url='/trending/movie/day?language=en-US' />
      {/* <MovieCard title="Indian movies" url = '/discover/movie?language=hindi&page=1&sort_by=popularity.desc&watch_region=India'/> */}
      <MovieCard title="popular movies" type="movie" url='/discover/movie?language=en-US&page=1&sort_by=popularity.desc' />
      </Suspense>
      <MovieCard title="popular tv-shows" type="tv" url='/discover/tv?language=en-US&page=1&sort_by=popularity.desc' />
      
      <Suspense fallback={<div>Loading...</div>}>
      <Celebrity title="popular celebrities" url='/person/popular?language=en-US&page=1' />
      <MovieCard title="Highest grossing movies" type="movie" url='/discover/movie?language=en-US&page=1&sort_by=revenue.desc&year=2024' />
      <MovieCard title="top rated movies" type="movie" url='/discover/movie?language=en-US&page=1&sort_by=vote_average.desc' />
      <MovieCard title="top rated tv-shows" type="tv" url='/discover/tv?language=en-US&page=1&sort_by=vote_average.desc' />
      </Suspense>

    </div>
  )
}

export default App
