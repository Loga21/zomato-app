import { useState, useEffect } from 'react';
import { fetchApi } from '../../utils/fetchApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './HomePage.scss';
import SignUp from '../SignUp/SignUp';
import LogIn from '../LogIn/LogIn';

const HomePage = () => {
  const [location, setLocation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  useEffect(() => {
    fetchApi('http://localhost:5000/branchs', 'GET')
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          setLocation(resInJson);
          console.log(location);
          setError(false);
        } else {
          setLocation([]);
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
    return <div className='spinner-border text-success' data-test-id='spinner'></div>;
  }

  if (error) {
    return <div className='alert-alert-danger'>Some Error Occurred. Try again later.</div>;
  }

  return (
    <>
      <div className='zomato-header'>
        <nav>
          <ul className='ul-nav'>
            <li>Add restaurant</li>
            <li
              type='button'
              className='btn btn-transparent'
              data-bs-toggle='modal'
              data-bs-target='#modal1'>
              Log in
            </li>
            <li
              type='button'
              className='btn btn-transparent'
              data-bs-toggle='modal'
              data-bs-target='#modal2'>
              Sign up
            </li>
          </ul>
        </nav>
        <div className='text-wrapper'>
          <img
            src='https://b.zmtcdn.com/web_assets/8313a97515fcb0447d2d77c276532a511583262271.png'
            alt='zomato-logo'
            className='zomato-logo'
          />
          <h1 className='text-white'>
            Find the best restaurants, cafes <br />
            and bars in india
          </h1>
        </div>
      </div>
      <div className='text-center'>
        <h2 className='location-header'>
          Popular locations in &nbsp;
          <img
            src='https://b.zmtcdn.com/images/flags_z10/in.png?output-format=webp'
            alt='flag'
            style={{ width: 55, height: 35 }}
          />
          &nbsp; India
        </h2>
        <p className='fs-5'>
          From swanky upscale restaurants to the cosiest hidden gems serving the most incredible
          food,
          <br />
          Zomato covers it all. Explore menus, and millions of restaurant photos and reviews from
          users
          <br />
          just like you, to find your next great meal.
        </p>
      </div>
      <div className='d-flex flex-wrap container mb-5 mt-5'>
        {location.states?.map((state) => {
          return (
            <div key={state.id} className='col-md-4 px-2 py-3'>
              <div className='card rounded-3 card-content'>
                <div className='card-body text-center'>
                  <a href='/cuisines' className='text-decoration-none text-dark'>
                    <span>{state.stateName}</span>
                  </a>
                  <FontAwesomeIcon icon='fa-solid fa-chevron-down' className='ms-5' />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <h2 className='container'>All Countries</h2>
      <div className='d-flex flex-wrap container mb-4 mt-3'>
        {location.countries?.map((countryName) => {
          return (
            <div
              key={countryName.id}
              className='card rounded-3 card-content col-md-4 px-2 py-1 my-2'>
              <div className='card-body d-flex justify-content-between'>
                <div>
                  <img
                    src={countryName.flagImgUrl}
                    alt='flag'
                    width={42}
                    height={32}
                    className='me-2'
                  />
                  <span>{countryName.countryName}</span>
                </div>
                <div>
                  <FontAwesomeIcon icon='fa-solid fa-chevron-down' />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <LogIn />
      <SignUp />
    </>
  );
};

export default HomePage;
