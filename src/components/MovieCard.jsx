import { useState, useEffect } from 'react'
import { getData } from '../api/apiconfig'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const MovieCard = (props) => {
  const [trendDay, settrendDay] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState({});

  const imgURL = 'https://image.tmdb.org/t/p/w200/';

  useEffect(() => {
    const url = props.url;
    getData(url).then((data) => {
      settrendDay(data.results);
      data.results.forEach(async (item) => {
        const isEligible = await fetchCredits(item.id);
        setFilteredMovies((prev) => ({ ...prev, [item.id]: isEligible }));
      });
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
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

  const eligibleMovies = trendDay.filter(
    (item) => item.poster_path && filteredMovies[item.id]
  );

  return (
    eligibleMovies.length > 0 && (
      <div className='card swiper'>
        <h2 className='movie-heading'>{props.title}</h2>
        <Swiper
          slidesPerView={6}
          spaceBetween={10}
          breakpoints={{
            150: { slidesPerView: 1 },
            255: { slidesPerView: 1.3 },
            362: { slidesPerView: 1.8 },
            455: { slidesPerView: 2.2 },
            500: { slidesPerView: 2.45 },
            688: { slidesPerView: 3.2 },
            860: { slidesPerView: 4 },
            1100: { slidesPerView: 5 },
            1300: { slidesPerView: 6 }
          }}
          modules={[Pagination]}
          className="mySwiper1"
        >
          <div className='movie-listt swiper-wrapper'>
            {eligibleMovies.map((item) => (
              <SwiperSlide key={item.id}>
                <Link
                  to={props.type === "movie" ? `/movies/${item.id}` : `/tv/${item.id}`}
                  onClick={scrollToTop}
                >
                  <div className="swipe-head1 swiper-slider">
                    <img src={imgURL + item.poster_path} alt="img.jpg" />
                    <div className="head-data1">
                      <p>{item.title ? item.title : item.name}</p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    )
  );
};

export default MovieCard;
