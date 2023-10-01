import { createContext, useState, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import FoodCartReducer from '../reducers/FoodCartReducer';
// import { useEffect, useReducer } from 'react';

export const cardContext = createContext(null);
const ContextAPI = ({ children }) => {
  const [cartState, cartDispatch] = useReducer(FoodCartReducer);
  console.log(cartState);

  useEffect(() => {
    cart.cartDispatch({
      type: 'FETCH_CART'
    });
  }, []);

  const cart = {
    cartState,
    cartDispatch
  };

  const [foodCardDetail, setFoodCardDetail] = useState({});
  const [filteredFood, setFilteredFood] = useState([]);
  const [restaurantCardDetail, setRestaurantFoodCardDetail] = useState({});
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [NightRestaurantCardDetail, setNightRestaurantFoodCardDetail] = useState({});
  const [filteredNightRestaurant, setFilteredNightRestaurant] = useState([]);
  const [sortByRatingFoodItems, setSortByRatingFoodItems] = useState([]);
  const [sortByTypeFoodItems, setSortByTypeFoodItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);
  return (
    <cardContext.Provider
      value={{
        foodCardDetail,
        setFoodCardDetail,
        filteredFood,
        setFilteredFood,
        restaurantCardDetail,
        setRestaurantFoodCardDetail,
        filteredRestaurant,
        setFilteredRestaurant,
        NightRestaurantCardDetail,
        setNightRestaurantFoodCardDetail,
        filteredNightRestaurant,
        setFilteredNightRestaurant,
        sortByRatingFoodItems,
        setSortByRatingFoodItems,
        sortByTypeFoodItems,
        setSortByTypeFoodItems,
        isLoading,
        setIsLoading,
        isError,
        setIsError,
        cart
      }}>
      {children}
    </cardContext.Provider>
  );
};

ContextAPI.propTypes = {
  children: PropTypes.object
};
export default ContextAPI;
