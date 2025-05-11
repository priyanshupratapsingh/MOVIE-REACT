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
  const [filteredMovies, setFilteredMovies] = useState({});

  const imgURL = 'https://image.tmdb.org/t/p/w200/'
  useEffect(() => {
    const url = props.url
    getData(url).then((data) => { 
      settrendDay(data.results) 
      data.results.forEach(async (item) => {
        const isEligible = await fetchCredits(item.id);
        setFilteredMovies((prev) => ({ ...prev, [item.id]: isEligible }));
      });
    })
  }, [])
    // Function to scroll to top
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // Optional smooth scrolling
      });
    };
  const fetchCredits = async (movieId) => {
    const creditsUrl = `/${props.type}/${movieId}/credits?language=en-US`;
    const credits = await getData(creditsUrl);
    const hasDirector = credits.crew.some((person) => person.job === 'Director');
    const hasProducer = credits.crew.some((person) => person.job === 'Producer');
    const hasDirecting = credits.crew.some((person) => person.known_for_department === 'Directing');
    const hasWriting = credits.crew.some((person) => person.known_for_department === 'Writing');
    return (hasDirector && hasProducer) || (hasDirecting && hasWriting);
  };
  
  return (
    <div className='card swiper'>
      <h2 className='movie-heading'>{props.title}</h2>
      <Swiper
        slidesPerView={6}
        spaceBetween={10}
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
              // Check eligibility from cached filteredMoviess
              const isEligible = filteredMovies[item.id];
              return <>
                {item.poster_path && isEligible ?
                  <SwiperSlide key={item.id}>
                    <Link to={props.type==="movie"? `/movies/${item.id}`: `/tv/${item.id}`}  onClick={scrollToTop}>
                      <div className="swipe-head1 swiper-slider">
                        <img src={imgURL + item.poster_path} alt="img.jpg" />
                        <div className="head-data1">
                          <p>{item.title ? item.title : item.name}</p>

                        </div>

                      </div>
                    </Link></SwiperSlide> : ""
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
