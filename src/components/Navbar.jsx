import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getData } from '../api/apiconfig';

const Navbar = () => {
  const [nav, setnav] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const changecolor = () => {
    if (window.scrollY >= 180) {
      setnav(true);
    } else {
      setnav(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changecolor);
    return () => window.removeEventListener('scroll', changecolor);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const searchUrl = `/search/movie?query=${encodeURIComponent(searchQuery)}&language=en-US&page=1`;
    const data = await getData(searchUrl);

    if (data.results && data.results.length > 0) {
      const firstResult = data.results[0];
      navigate(`/movies/${firstResult.id}`);
    } else {
      alert('No movie found with that title.');
    }
  };

  return (
    <div>
      <header>
        <div className={nav ? "heading-scroll" : "heading"}>
          <div className="head2">
            <div className="title">
              <Link to="/" className="logo">
                <img className="title-img" src="../svg/popcorn.png" alt="logo.svg" />
                <div className="title2">
                  <p>MovieVerse</p>
                  <p>Insights</p>
                </div>
              </Link>
            </div>
            <div>
              <ul className="menu">
                <li><Link to="/">Movies</Link></li>
                <li><Link to="/">TV Shows</Link></li>
                <li><Link to="/mylist">My List</Link></li>
                <li><Link to="/login">Log Out</Link></li>
              </ul>
            </div>
          </div>

          <div className="heading2">
              <div className="search-container">
                <form onSubmit={handleSearch} className="search-container">

                  <input
                    className="ip"
                    type="text"
                    placeholder="Search movie"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  <button type="submit" className='search-icon sub-btn'>
                    <i className="fa-solid fa-magnifying-glass "></i>
                  </button>
                </form>
              </div>

            <Link to="/"><i className="fa-solid fa-house ibtn"></i></Link>

          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
