import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect, useContext } from 'react';
import { fetchApi } from '../../utils/fetchApi';
import LogIn from '../../pages/LogIn/LogIn';
import SignUp from '../../pages/SignUp/SignUp';
// import PropTypes from 'prop-types';
import { cardContext } from '../ContextAPI/ContextAPI';
import './PrimaryHeader.scss';

const PrimaryHeader = () => {
  const {
    loginState,
    userInfoParsed,
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
  console.log(primaryMenuBtn);
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
      <nav className='navbar navbar-expand-lg bg-body-tertiary'>
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
            <FontAwesomeIcon icon='fa-solid fa-bars' className='fs-3' />
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4'>
              <li className='nav-item bg-white shadow-sm border-secondary rounded-start py-lg-1'>
                <a
                  className='nav-link dropdown-toggle border-end border-body-secondary pe-lg-5 ms-lg-3'
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
              <form className='d-flex shadow-sm w-75' role='search'>
                <button className='btn bg-white text-secondary rounded-0 focus-out ps-lg-5' type='button'>
                  <FontAwesomeIcon icon='fa-solid fa-magnifying-glass' />
                </button>
                <input
                  className='border-0 text-secondary p-2 focus-out'
                  type='search'
                  style={{ width: 450 }}
                  placeholder='Search for restaurant, cuisine or a dish'
                  onKeyUp={(e) => handleSearch(e)}
                />
              </form>
            </ul>
            <ul className='d-block d-lg-flex mb-0 list-unstyled'>
              {!loginState &&
                primaryMenuBtn?.map((btn) => {
                  return (
                    <li
                      key={btn.id}
                      className={btn.id === 1 ? 'nav-item' : 'nav-item ms-lg-4'}
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
              {loginState && (
                <li className='nav-item p-1 ms-4 text-secondary'>
                  <FontAwesomeIcon
                    icon='fa-solid fa-circle-user'
                    className='fs-2 me-2'
                    style={{ verticalAlign: -10 }}
                  />
                  <span>{userInfoParsed.userName}</span>
                </li>
              )}
            </ul>
          </div>
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
