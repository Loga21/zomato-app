import { useState, useEffect } from 'react';
import { fetchApi } from '../../utils/fetchApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FoodItems from '../FoodItems/FoodItems';
import Accordian from '../../components/Accordian/Accordian';

const CuisinesPage = () => {
  const [food, setFood] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  useEffect(() => {
    fetchApi('http://localhost:5000/cuisine', 'GET')
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          setFood(resInJson);
          setError(false);
        } else {
          setFood({});
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
    return <div className='spinner-border text-success position-absolute top-50 start-50 translate-middle' data-test-id='spinner'></div>;
  }

  if (error) {
    return <div className='alert-alert-danger'>Some Error Occurred. Try again later.</div>;
  }

  return (
    <div className='container mb-4'>
      <div className='mb-5 mt-4 bg-light px-2 py-1'>
        <h3 className='my-4'>Inspiration for your first order</h3>
        <div className='d-flex'>
          {food.sampleFood?.map((items) => {
            return (
              <div key={items.id}>
                <img
                  src={items.foodImgUrl}
                  alt={items.foodName}
                  width={150}
                  height={150}
                  className='rounded-circle'
                  style={{ marginRight: 40 }}
                />
                <h6 className='fs-5 text-secondary mt-3' style={{ marginLeft: 45 }}>
                  {items.foodName}
                </h6>
              </div>
            );
          })}
        </div>
      </div>
      <h3 className='my-4'>Top brands for you</h3>
      <div className='d-flex'>
        {food.brands?.map((name) => {
          return (
            <div key={name.id} className='me-5 text-center'>
              <span className='rounded-circle border border-light-subtle shadow py-5 px-1'>
                <img
                  src={name.brandImgUrl}
                  alt={name.brandName}
                  height={100}
                  className='m-3 py-2'
                />
              </span>
              <p className='text-center m-0 mt-2'>{name.brandName}</p>
              <p className='text-center text-secondary m-0 mt-1'>{name.deliveryTimePeriod}</p>
            </div>
          );
        })}
      </div>
      <h3 className='my-4 ms-3'>Best Food in Chennai</h3>
      <FoodItems />
      <h3 className='ms-3 mt-5'>Popular localities in and around Chennai</h3>
      <div className='d-flex flex-wrap container mb-4 mt-3'>
        {food.popularLocalities?.map((area) => {
          return (
            <div key={area.id} className='col-md-4 px-2 py-3'>
              <div className='card rounded-3 card-content'>
                <div className='card-body d-flex justify-content-between'>
                  <div>
                    <p className='m-0' style={{ fontSize: 19 }}>
                      {area.area}
                    </p>
                    <p className='m-0 text-secondary'>{area.noOfRestaurants}</p>
                  </div>
                  <div>
                    <FontAwesomeIcon
                      icon='fa-solid fa-chevron-right'
                      className='ms-5 mt-3'
                      style={{ fontSize: 12 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <h3 className='ms-3 mb-4'>Explore options near me</h3>
      <Accordian />
    </div>
  );
};

export default CuisinesPage;
