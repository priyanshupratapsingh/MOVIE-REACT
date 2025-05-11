import { useState, useEffect } from 'react'
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
import { getData } from '../api/apiconfig'
import Navbar from './Navbar';
import MovieCard from './MovieCard';
const TVdata = () => {
  const {tvid} = useParams();

  const [apiData, setapiData] = useState({})
  const [peopleData, setpeopleData] = useState({})
  const [similarAvailable, setSimilarAvailable] = useState(false);
  const [recommendAvailable, setRecommendAvailable] = useState(false);

  const imgURL = 'https://image.tmdb.org/t/p/original/'
  const imgURL2 = 'https://image.tmdb.org/t/p/w200/'

  const similar = `/tv/${tvid}/similar?language=en-US&page=1`
  const recommend = `/tv/${tvid}/recommendations?language=en-US&page=1`
  useEffect(() => {
    const url = `/tv/${tvid}?language=en-US`
    const people = `/tv/${tvid}/credits?language=en-US`

    getData(url).then((data) => { setapiData(data) })
    getData(people).then((data) => { setpeopleData(data) })
    // Check if similar and recommended data exist
    getData(similar).then((data) => {
      setSimilarAvailable(data.results && data.results.length > 0);
    });
    getData(recommend).then((data) => {
      setRecommendAvailable(data.results && data.results.length > 0);
    });
  }, [tvid])

  const imagePath = apiData.backdrop_path || apiData.poster_path;
  const posterPath = apiData.poster_path || apiData.backdrop_path;

  if (!imagePath) {
    console.error("No image path available for this movie.");
  }

  // console.log("Params:"+ ;
  // console.dir(;
  // console.log("Data here is ss: " + apiData)
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
                <h1>{apiData?.name}</h1>
              </div>
              <div className="b">
                {apiData?.genres?.map(item => (
                  <div className='genre' key={item.id}>
                    {item.name}
                  </div>
                ))}
              </div>
              <div className="c">
                <p>Rating: {apiData?.vote_average?.toFixed(1)}+</p>
                <span> | </span>
                <p>Views: {apiData?.vote_count}</p>
                <span> | </span>
                <p>Season: {apiData?.number_of_seasons}</p>
                <span> | </span>
                <p>Episodes: {apiData?.number_of_episodes}</p>
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
                  <p>Release Date: {moment(apiData.first_air_date).format("Do MMMM, YYYY")}</p>
                </div>
                {apiData.status === "Ended" && <span> | </span>}
                
                <div>
                  {apiData.status === "Ended" ? 
                  <> <p>End Date: {moment(apiData.last_air_date).format("Do MMMM, YYYY")}</p></> : ""}
                </div>
              </div>
              <div className="divider"></div>
              <div className="f">
                <p>
                  Director: {peopleData.crew ? peopleData.crew.find((member) => member.known_for_department === "Directing")?.name
                    : "Loading crew data..."}
                </p>
              </div>
              <div className="divider"></div>
              <div className="f">
                <p>
                  Writer: {peopleData.crew ? peopleData.crew.find((member) => member.known_for_department === "Writing")?.name
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
                          <SwiperSlide>
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
              {/* infoData ending below */}
            </div>

          </div>

        </div>)
        : (<p>Loading data</p>)}
      {similarAvailable && (
        <div className="similarmov">
          <MovieCard title="Similar Movies" type="tv" url={similar} />
        </div>
      )}

      {recommendAvailable && (
        <div className="recommendmov">
          <MovieCard title="Recommended Movies" type="tv" url={recommend} />
        </div>
      )}
    </div>
  )

}

export default TVdata
