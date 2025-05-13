import { useState, useEffect } from 'react'
import { getData } from '../api/apiconfig'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper/modules';

const MovieCard = (props) => {
  const [trendDay, settrendDay] = useState([])

  const imgURL = 'https://image.tmdb.org/t/p/w500/'  // Changed to w500 for better quality
  useEffect(() => {
    const url = props.url
    getData(url).then((data) => { settrendDay(data.results) })
  }, [])
  return (
    <div className='card swiper celebrity-swiper'>
      <h2 className='movie-heading'>{props.title}</h2>
      <Swiper
        slidesPerView={5}
        spaceBetween={0}
        breakpoints={{
          150: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          362: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          500: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
          688: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
          860: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
          1100: {
            slidesPerView: 5,
            spaceBetween: 0,
          }
        }}
        modules={[Pagination]}
        className="mySwiper1"
      >
        {trendDay.length > 0 ? (
          <div className='movie-listt swiper-wrapper'>
            {trendDay.map(item => {
              return <>
                {item.profile_path ?
                  <SwiperSlide key={item.id}>
                    <div className="celebrity-card">
                      <div className="celebrity-image-container">
                        <img 
                          src={imgURL + item.profile_path} 
                          alt={item.name} 
                          className="celebrity-image"
                        />
                      </div>
                      <div className="head-data1">
                        <p className="celebrity-name">{item.name}</p>
                      </div>
                    </div>
                  </SwiperSlide> : ""
                }
              </>
            })}
          </div>
        ) : (
          <p>Loading data...</p>
        )}
      </Swiper>
    </div>
  )
}

export default MovieCard
