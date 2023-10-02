import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect, useContext } from 'react';
import { fetchApi } from '../../../utils/fetchApi';
import { cardContext } from '../../../components/ContextAPI/ContextAPI';

const TrendingDinings = () => {
  const [trendingRestaurants, setTrendingRestaurants] = useState({});
  const {
    setRestaurantFoodCardDetail,
    filteredRestaurant,
    sortByRestroTypeDiningOut,
    sortByRatingDiningOut,
    sortBySeatingDiningOut,
    sortByServesDiningOut,
    sortByOpenStatusDiningOut
  } = useContext(cardContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  useEffect(() => {
    fetchApi('http://localhost:5000/diningOut', 'GET')
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          setTrendingRestaurants(resInJson);
          setRestaurantFoodCardDetail(resInJson);
          setError(false);
        } else {
          setTrendingRestaurants({});
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

  const restaurantContainer = (restaurants) => {
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
              <p className='text-secondary m-0'>{restaurants.distance} km</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  console.log(sortByRestroTypeDiningOut);
  return (
    <div className='ms-2 row product-cards'>
      {filteredRestaurant.length > 0
        ? filteredRestaurant &&
          filteredRestaurant?.map((restaurants) => {
            return restaurantContainer(restaurants);
          })
        : (sortByRestroTypeDiningOut.length > 0)
            ? sortByRestroTypeDiningOut &&
          sortByRestroTypeDiningOut?.map((restaurants) => {
            return restaurantContainer(restaurants);
          })
            : (sortByRatingDiningOut.length > 0)
                ? sortByRatingDiningOut &&
          sortByRatingDiningOut?.map((restaurants) => {
            return restaurantContainer(restaurants);
          })
                : (sortBySeatingDiningOut.length > 0)
                    ? sortBySeatingDiningOut &&
          sortBySeatingDiningOut?.map((restaurants) => {
            return restaurantContainer(restaurants);
          })
                    : (sortByServesDiningOut.length > 0)
                        ? sortByServesDiningOut &&
          sortByServesDiningOut?.map((restaurants) => {
            return restaurantContainer(restaurants);
          })
                        : (sortByOpenStatusDiningOut.length > 0)
                            ? sortByOpenStatusDiningOut &&
          sortByOpenStatusDiningOut?.map((restaurants) => {
            return restaurantContainer(restaurants);
          })
                            : trendingRestaurants.trendingDinings?.map((restaurants) => {
                              return restaurantContainer(restaurants);
                            })}
    </div>
  );
};

export default TrendingDinings;
