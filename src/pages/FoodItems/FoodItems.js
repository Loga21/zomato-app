import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect, useContext } from 'react';
import { fetchApi } from '../../utils/fetchApi';
import { cardContext } from '../../components/ContextAPI/ContextAPI';

const FoodItems = () => {
  const [food, setFood] = useState({});
  const { setFoodCardDetail, filteredFood, sortByRatingFoodItems, sortByTypeFoodItems } = useContext(cardContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  useEffect(() => {
    fetchApi('http://localhost:5000/cuisine', 'GET')
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          setFood(resInJson);
          setFoodCardDetail(resInJson);
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
    return <div className='spinner-border text-success invisible' data-test-id='spinner'></div>;
  }

  if (error) {
    return <div className='alert-alert-danger'>Some Error Occurred. Try again later.</div>;
  }

  const { cart } = useContext(cardContext);

  const handleAddToCart = (foodItem) => {
    cart.cartDispatch({
      type: 'ADD_TO_CART',
      payload: foodItem
    });
  };

  const foodItem = (food) => {
    return (
      <div className='col-md-4' key={food.id}>
        <div className='card p-2 shadow mb-4 bg-body-tertiary rounded'>
          <div className='position-relative'>
            <a href='/cuisine-details'>
              <img
                src={food.cuisineImg}
                className='card-img-top rounded-4'
                alt={food.cuisineName}
                height={200}
              />
            </a>
            <p
              className='bg-primary col-md-2 text-center rounded-1 ms-2 text-light position-absolute bottom-0 start-0'
              style={{ fontSize: 12 }}>
              {food.offer}% OFF
            </p>
          </div>
          <div className='card-body d-flex justify-content-between'>
            <div>
              <div className='card-title fs-5 product-title text-decoration-none'>
                {food.hotelName}
              </div>
              <div className='text-secondary'>{food.cuisineName}</div>
              <div>
                <button
                  className='btn btn-warning btn-sm'
                  onClick={handleAddToCart.bind(this, food)}>
                  Add to Cart
                </button>
              </div>
            </div>
            <div className='text-end'>
              <div
                className='bg-success rounded text-light px-1'
                style={{ marginLeft: 70, fontSize: 14 }}>
                {food.rating}
                <FontAwesomeIcon
                  icon='fa-solid fa-star'
                  className='fs-n1 text-light'
                  style={{ fontSize: 8, paddingBottom: 2, marginLeft: 2 }}
                />
              </div>
              <p className='card-text text-secondary m-0'>₹{food.price} for one</p>
              <p className='text-secondary m-0'>{food.timeTaken} min</p>
            </div>
          </div>
          <hr className='m-0 text-secondary' />
          <div className='d-flex my-3 ms-3'>
            <img
              src='https://b.zmtcdn.com/data/o2_assets/695598f38d29d0e5d3f8ffe57cfdb94c1613145422.png'
              alt='PrepareGuideLines'
              height={18}
            />
            <div>
              <p className='m-0 ms-2 text-secondary' style={{ fontSize: 13 }}>
                Restaurant partner follows WHO protocol
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
      <div className='ms-2 row product-cards'>
        {filteredFood.length > 0
          ? filteredFood &&
            filteredFood?.map((food) => {
              return foodItem(food);
            })
          : (sortByRatingFoodItems.length > 0)
              ? sortByRatingFoodItems && sortByRatingFoodItems?.map((food) => {
                return foodItem(food);
              })
              : (sortByTypeFoodItems.length > 0)
                  ? sortByTypeFoodItems && sortByTypeFoodItems?.map((food) => {
                    return foodItem(food);
                  })
                  : food.foodItems?.map((food) => {
                    return foodItem(food);
                  })}
      </div>
  );
};

export default FoodItems;
