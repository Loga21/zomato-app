import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect, useContext } from 'react';
import { fetchApi } from '../../utils/fetchApi';
import LogIn from '../../pages/LogIn/LogIn';
import SignUp from '../../pages/SignUp/SignUp';
// import PropTypes from 'prop-types';
import './PrimaryHeader.scss';
import { cardContext } from '../ContextAPI/ContextAPI';

const PrimaryHeader = () => {
  const {
    foodCardDetail,
    setFilteredFood,
    restaurantFoodCardDetail,
    setFilteredRestaurant,
    NightRestaurantCardDetail,
    setFilteredNightRestaurant
  } = useContext(cardContext);
  // console.log(foodCardDetail);
  // console.log(restaurantFoodCardDetail);

  const [primaryMenuBtn, setPrimaryMenuBtn] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    fetchApi('http://localhost:5000/primaryHeader', 'GET')
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          setPrimaryMenuBtn(resInJson);
          setError(false);
        } else {
          setPrimaryMenuBtn([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className='spinner-border text-success invisible' data-test-id='spinner'></div>;
  }

  if (error) {
    return <div className='alert-alert-danger'>Some Error Occurred. Try again later.</div>;
  }

  const handleSearch = (e) => {
    const searchText = e.target.value;
    const searchFilter = foodCardDetail.foodItems?.filter((word) => {
      return word.cuisineName.toLowerCase().includes(searchText.toLowerCase());
    });
    // console.log(searchFilter);
    setFilteredFood(searchFilter);
    const searchRestaurantFilter = restaurantFoodCardDetail.trendingDinings?.filter((word) => {
      return word.diningName.toLowerCase().includes(searchText.toLowerCase());
    });
    setFilteredRestaurant(searchRestaurantFilter);
    const searchNightRestaurantFilter = NightRestaurantCardDetail.nightTimeRestaurants?.filter(
      (word) => {
        return word.diningName.toLowerCase().includes(searchText.toLowerCase());
      }
    );
    setFilteredNightRestaurant(searchNightRestaurantFilter);
  };

  return (
    <>
      <nav className='navbar navbar-expand-lg bg-light mt-1'>
        <div className='container'>
          <a className='navbar-brand' href='#'>
            <img
              src='https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png'
              alt='Bootstrap'
              width='125'
              height='30'
            />
          </a>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div
            className='collapse navbar-collapse border rounded shadow-sm bg-white'
            id='navbarSupportedContent'>
            <ul className='navbar-nav mb-2'>
              <li className='nav-item dropdown mt-1 ms-2'>
                <a
                  className='nav-link dropdown-toggle'
                  href='#'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'>
                  <FontAwesomeIcon
                    icon='fa-solid fa-location-dot'
                    className='me-2 fs-5 text-danger'
                  />
                  Chennai
                </a>
                <ul className='dropdown-menu'>
                  <li>
                    <a className='dropdown-item' href='#'>
                      <FontAwesomeIcon
                        icon='fa-solid fa-location-crosshairs'
                        className='me-2 text-danger'
                      />
                      Detect current location
                      <br />
                      <div className='ms-4'>using GPS</div>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <form className='ms-5 border-start border-secondary-subtle'>
              <span className='d-flex'>
                <button className='btn bg-white text-secondary rounded-0 focus-out' type='button'>
                  <FontAwesomeIcon icon='fa-solid fa-magnifying-glass' />
                </button>
                <input
                  className='border-0 text-secondary p-2 focus-out'
                  type='search'
                  style={{ width: 450 }}
                  placeholder='Search for restaurant, cuisine or a dish'
                  onKeyUp={(e) => handleSearch(e)}
                />
              </span>
            </form>
          </div>
          <ul className='navbar-nav mb-2 mb-lg-0 fs-5 ms-5'>
            {primaryMenuBtn?.map((btn) => {
              return (
                <li
                  key={btn.id}
                  className={btn.id === 1 ? 'nav-item ms-5' : 'nav-item ms-2'}
                  type='button'
                  // className='btn btn-transparent'
                  data-bs-toggle='modal'
                  data-bs-target={btn.id === 1 ? '#loginModal' : '#signUpModal'}>
                  <a className='nav-link text-secondary' href='#' role='button'>
                    {btn.btnText}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
      <LogIn />
      <SignUp />
    </>
  );
};

// PrimaryHeader.propTypes = {
//   handleSearch: PropTypes.func
// };

export default PrimaryHeader;
