import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const cardContext = createContext(null);
const ContextAPI = ({ children }) => {
  const [foodCardDetail, setFoodCardDetail] = useState({});
  const [filteredFood, setFilteredFood] = useState([]);
  const [restaurantCardDetail, setRestaurantFoodCardDetail] = useState({});
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [NightRestaurantCardDetail, setNightRestaurantFoodCardDetail] = useState({});
  const [filteredNightRestaurant, setFilteredNightRestaurant] = useState([]);
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
        isLoading,
        setIsLoading,
        isError,
        setIsError
      }}>
      {children}
    </cardContext.Provider>
  );
};

ContextAPI.propTypes = {
  children: PropTypes.object
};
export default ContextAPI;
