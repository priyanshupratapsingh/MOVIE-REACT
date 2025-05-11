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

  const imgURL = 'https://image.tmdb.org/t/p/w200/'
  useEffect(() => {
    const url = props.url

    getData(url).then((data) => { settrendDay(data.results) })
  }, [])
  return (
    <div className='card swiper'>
      <h2 className='movie-heading'>{props.title}</h2>
      <Swiper
        slidesPerView={6}
        spaceBetween={50}
        breakpoints={{
          150: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          255: {
            slidesPerView: 1.3,
            spaceBetween: 0,
          },
          362: {
            slidesPerView: 1.8,
            spaceBetween: 0,
          },
          455: {
            slidesPerView: 2.2,
            spaceBetween: 0,
          },
          500: {
            slidesPerView: 2.45,
            spaceBetween: 0,
          },
          688: {
            slidesPerView: 3.2,
            spaceBetween: 2,
          },
          860: {
            slidesPerView: 4,
            spaceBetween: 5,
          },
          1100: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
          1300: {
            slidesPerView: 6,
            spaceBetween: 40,
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
                    {/* <Link to={`/movies/${item.id}`}  > */}
                      <div className="swipe-head1 swiper-slider">

                        <img src={imgURL + item.profile_path} alt="img.jpg" />
                        <div className="head-data1">
                          <p>{item.title ? item.title : item.name}</p>

                        </div>
                      </div>

                    {/* </Link> */}
                    </SwiperSlide> : ""
                }
              </>
            }
            )}
          </div >
        ) : (
          <p>Loading data...</p>
        )}
      </Swiper>

    </div>
  )
}

export default MovieCard
