import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
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
const Data = () => {
  const {movieid} = useParams();

  const [apiData, setapiData] = useState({})
  const [peopleData, setpeopleData] = useState({})

  const imgURL = 'https://image.tmdb.org/t/p/original/'
  const imgURL2 = 'https://image.tmdb.org/t/p/w200/'
  const [similarAvailable, setSimilarAvailable] = useState(false);
  const [recommendAvailable, setRecommendAvailable] = useState(false);

  const similar = `/movie/${movieid}/similar?language=en-US&page=1`
  const recommend = `/movie/${movieid}/recommendations?language=en-US&page=1`
  useEffect(() => {
    const url = `/movie/${movieid}?language=en-US`
    const people = `/movie/${movieid}/credits?language=en-US`

    getData(url).then((data) => { setapiData(data) })
    getData(people).then((data) => { setpeopleData(data) })
    // Check if similar and recommended data exist
    getData(similar).then((data) => {
      setSimilarAvailable(data.results && data.results.length > 0);
    });
    getData(recommend).then((data) => {
      setRecommendAvailable(data.results && data.results.length > 0);
    });
  },[movieid])

  const imagePath = apiData.backdrop_path || apiData.poster_path;
  const posterPath = apiData.poster_path || apiData.backdrop_path;
  // console.log("Params:"+ ;
  // console.dir(;
  console.dir(peopleData)
  console.dir(apiData);
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
              <div className="b">
                {apiData?.genres?.map(item => (
                  <div className='genre' key={item.id}>
                    {item.name}
                  </div>
                ))}
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
