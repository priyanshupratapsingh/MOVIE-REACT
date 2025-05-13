import { useState, useEffect, useRef } from 'react'
import { Link,useParams, Navigate } from 'react-router-dom';
import moment from "moment";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';
import '../css/Data.css'
import '../css/mediadata.css'
import { getData } from '../api/apiconfig'
import Navbar from './Navbar';
import MovieCard from './MovieCard';

import { useAuth } from '../AuthContext';
const Data = () => {
  const {movieid} = useParams();
   const { isAuthenticated, user } = useAuth();
  const [apiData, setapiData] = useState({})
  const [peopleData, setpeopleData] = useState({})
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loadingBookmark, setLoadingBookmark] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(true); // New loading state

  const imgURL = 'https://image.tmdb.org/t/p/original/'
  const imgURL2 = 'https://image.tmdb.org/t/p/w200/'
  const [similarAvailable, setSimilarAvailable] = useState(false);
  const [recommendAvailable, setRecommendAvailable] = useState(false);

  const similar = `/movie/${movieid}/similar?language=en-US&page=1`
  const recommend = `/movie/${movieid}/recommendations?language=en-US&page=1`
  useEffect(() => {
    const url = `/movie/${movieid}?language=en-US`
    const people = `/movie/${movieid}/credits?language=en-US`

    getData(url).then((data) => { 
      setapiData(data);
      // Check if movie is already bookmarked when data loads
      if (user && user.bookmarks) {
        const alreadyBookmarked = user.bookmarks.some(b => b.movieId === movieid);
        setIsBookmarked(alreadyBookmarked);
      }
    });
    getData(people).then((data) => { setpeopleData(data) })
    // Check if similar and recommended data exist
    getData(similar).then((data) => {
      setSimilarAvailable(data.results && data.results.length > 0);
    });
    getData(recommend).then((data) => {
      setRecommendAvailable(data.results && data.results.length > 0);
    });
        const checkBookmarkStatus = async () => {
      if (!isAuthenticated) {
        setLoadingStatus(false);
        return;
      }

      try {
        const response = await fetch(`https://mv-backend-k53w.onrender.com/api/check-bookmark/${movieid}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setIsBookmarked(data.isBookmarked);
        }
      } catch (error) {
        console.error('Error checking bookmark status:', error);
      } finally {
        setLoadingStatus(false);
      }
    };

    checkBookmarkStatus();
  },[movieid,isAuthenticated])
  //bookmark code
    const handleAddToList = async () => {
    if (!isAuthenticated) {
      alert('Please login to add to your list');
      return;
    }

    const userConfirmed = window.confirm('Are you sure you want to add this movie to your list?');
    if (!userConfirmed) {
      return; // Exit if the user cancels the action
    }

    setLoadingBookmark(true);
    try {
      const response = await fetch('https://mv-backend-k53w.onrender.com/api/bookmark', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          movieId: movieid.toString(),
          title: apiData.title,
          posterPath: apiData.poster_path
        })
      });

      const result = await response.json();
      
      if (response.ok) {
        setIsBookmarked(true);
        alert('Added to your list!');
      } else {
        alert(result.message || 'Failed to add to list');
      }
    } catch (error) {
      console.error('Error adding to list:', error);
      alert('Error adding to list');
    } finally {
      setLoadingBookmark(false);
    }
  };
  //till here bookmark code

  const imagePath = apiData.backdrop_path || apiData.poster_path;
  const posterPath = apiData.poster_path || apiData.backdrop_path;
  // console.log("Params:"+ ;
  // console.dir(;
  console.dir(peopleData)
  console.dir(apiData);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div>
      <Navbar />

      {apiData ? (
        <div >
          <div className="headimgdivD">
            <img className='headimgD' src={imagePath ? imgURL + imagePath : "fallback_image_url_here"} alt="img.jpg" />

          </div>

          <div className="movieData">
            <div className="imgData">
              <img src={imagePath ? imgURL + posterPath : "fallback_image_url_here"} alt="img.jpg" width={225} />
            </div>
            <div className="infoData">
              <div className="a">
                <h1>{apiData?.title}</h1>

              </div>
              <div className="bb1">
              <div className="b">
                {apiData?.genres?.map(item => (
                  <div className='genre' key={item.id}>
                    {item.name}
                  </div>
                ))}
              </div>
                <div className="b1" onClick={handleAddToList}>
                  {loadingStatus ? (
                    <p>Checking status...</p>
                  ) : (
                    <>
                      <i className={`fa-solid ${isBookmarked ? 'fa-check' : 'fa-plus'}`}></i>
                      <p>{loadingBookmark ? 'Processing...' : isBookmarked ? 'In My List' : 'Add to My List'}</p>
                    </>
                  )}
                </div>
              </div>
              {/* <div className="divider"></div> */}
              <div className="c">
                <p>Rating: {apiData?.vote_average?.toFixed(1)}+</p>
                <span> | </span>
                <p>Views: {apiData?.vote_count}</p>
                <span> | </span>
                <p>Runtime: {Math.floor(apiData?.runtime / 60)}h {apiData?.runtime % 60}m</p>
              </div>
              <div className="divider"></div>
              <div className="d">
                <h3>Overview</h3>
                <p>{apiData?.overview}</p>
              </div>
              <div className="divider"></div>
              <div className="e">
                <div>
                  <p>Status: {apiData.status}</p>
                </div>
                <span> | </span>
                <div>
                  <p>Release Date: {moment(apiData.release_date).format("Do MMMM, YYYY")}</p>
                </div>
              </div>
              <div className="divider"></div>
              <div className="f">
                <p>
                  Director: {peopleData.crew ? peopleData.crew.find((member) => member.job === "Director").name
                    : "Loading crew data..."}
                </p>
              </div>
              <div className="divider"></div>
              <div className="f">
                <p>
                  Producer: {peopleData.crew ? peopleData.crew.find((member) => member.job === "Producer")?.name
                    : "Loading crew data..."}
                </p>
              </div>
              <div className="divider"></div>
              <div className="g">
                <p>Casts</p>
                <Swiper
                  slidesPerView={7}
                  spaceBetween={30}
                  breakpoints={{
                    150: {
                      slidesPerView: 2,
                      spaceBetween: 0,
                    },
                    320: {
                      slidesPerView: 2.6,
                      spaceBetween: 0,
                    },
                    387: {
                      slidesPerView: 3,
                      spaceBetween: 0,
                    },
                    447: {
                      slidesPerView: 3.5,
                      spaceBetween: 10,
                    },
                    550: {
                      slidesPerView: 4,
                      spaceBetween: 12,
                    },
                    900: {
                      slidesPerView: 5,
                      spaceBetween: 15,
                    },
                    1085: {
                      slidesPerView: 6,
                      spaceBetween: 30,
                    },
                    1280: {
                      slidesPerView: 7,
                      spaceBetween: 30,
                    }
                  }}
                  modules={[Pagination]}
                  className="mySwiper swiperData"
                >
                  {peopleData.cast ?
                    peopleData.cast.map(item => {
                      return <>

                        {item.profile_path ?
                          <SwiperSlide key={item.id}>
                            <div className="swiper-slider swiper-sliderData">

                              <img src={imgURL2 + item.profile_path} alt="img.jpg" />
                              <div className="castData">
                                <p>{item.name}</p>

                              </div>
                            </div>
                          </SwiperSlide> : ""}
                      </>
                    }

                    )
                    : "loading"}

                </Swiper>
              </div>
            </div>
          </div>
        </div>)
        : (<p>Loading data</p>)}

      {similarAvailable && (
        <div className="similarmov">
          <MovieCard title="Similar Movies" type="movie" url={similar} />
        </div>
      )}

      {recommendAvailable && (
        <div className="recommendmov">
          <MovieCard title="Recommended Movies" type="movie" url={recommend} />
        </div>
      )}
    </div>
  )
}

export default Data
