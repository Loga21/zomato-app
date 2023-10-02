import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect, useContext } from 'react';
import { fetchApi } from '../../../utils/fetchApi';
import { cardContext } from '../../../components/ContextAPI/ContextAPI';

const NightTimeRestaurants = () => {
  const {
    setNightRestaurantFoodCardDetail,
    filteredNightRestaurant,
    sortByDistanceNightLife,
    sortByRestroTypeNightLife,
    sortByRatingNightLife,
    sortByPubsNightLife
  } = useContext(cardContext);
  const [nightRestaurants, setNightRestaurants] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  useEffect(() => {
    fetchApi('http://localhost:5000/NightLife', 'GET')
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          setNightRestaurants(resInJson);
          setNightRestaurantFoodCardDetail(resInJson);
          setError(false);
        } else {
          setNightRestaurants({});
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

  const nightTimeRestro = (restaurants) => {
    return (
      <div className='col-md-4' key={restaurants.id}>
        <div className='card p-2 shadow mb-4 bg-body-tertiary rounded'>
          <div className='position-relative'>
            <a href='/cuisine-details'>
              <img
                src={restaurants.diningImg}
                className='card-img-top rounded-4'
                alt={restaurants.diningName}
                height={225}
              />
            </a>
            <div className='d-flex col-md-4 bg-dark text-center rounded-1 ms-2 text-light p-1 position-absolute bottom-0 start-0'>
              <img
                src='https://b.zmtcdn.com/data/o2_assets/9b1ff9e19b7fadea6c6a57e081a1f5ac1687776279.png'
                alt='offer-logo'
                height={18}
              />
              <p className='m-0 ms-2' style={{ fontSize: 12 }}>
                Flat{restaurants.offerInfo}% OFF
              </p>
            </div>
          </div>
          <div className='card-body d-flex justify-content-between p-0 p-1 pb-0'>
            <div>
              <p className='card-title m-0 mb-1 fs-5 product-title text-decoration-none'>
                {restaurants.diningName}
              </p>
              <p className='text-secondary m-0'>{restaurants.cuisineName}</p>
              <p className='text-secondary'>{restaurants.location}</p>
              <p className='text-secondary text-danger mt-4'>{restaurants.opensAt}</p>
            </div>
            <div className='text-end mt-2'>
              <div
                className='bg-success rounded text-light px-1 mb-1'
                style={{ marginLeft: 60, fontSize: 14 }}>
                {restaurants.rating}
                <FontAwesomeIcon
                  icon='fa-solid fa-star'
                  className='fs-n1 text-light'
                  style={{ fontSize: 8, paddingBottom: 2, marginLeft: 2 }}
                />
              </div>
              <p className='card-text text-secondary m-0'>₹{restaurants.price} for two</p>
              <p className='text-secondary m-0 mt-5'>{restaurants.distance} km</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className='ms-2 row product-cards'>
      {filteredNightRestaurant.length > 0
        ? filteredNightRestaurant &&
          filteredNightRestaurant?.map((restaurants) => {
            return nightTimeRestro(restaurants);
          })
        : sortByDistanceNightLife.length > 0
          ? sortByDistanceNightLife &&
          sortByDistanceNightLife?.map((restaurants) => {
            return nightTimeRestro(restaurants);
          })
          : sortByRestroTypeNightLife.length > 0
            ? sortByRestroTypeNightLife &&
          sortByRestroTypeNightLife?.map((restaurants) => {
            return nightTimeRestro(restaurants);
          })
            : sortByRatingNightLife.length > 0
              ? sortByRatingNightLife &&
          sortByRatingNightLife?.map((restaurants) => {
            return nightTimeRestro(restaurants);
          })
              : sortByPubsNightLife.length > 0
                ? sortByPubsNightLife &&
          sortByPubsNightLife?.map((restaurants) => {
            return nightTimeRestro(restaurants);
          })
                : nightRestaurants.nightTimeRestaurants?.map((restaurants) => {
                  return nightTimeRestro(restaurants);
                })}
    </div>
  );
};

export default NightTimeRestaurants;
