import React, { useState, useContext, createContext, useEffect } from "react";
import { LocationContext } from "../location/location.context";
import { restaurantRequest, restaurantTransform } from "./restaurants.service";

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = ({ children }) => {
  const [state, setState] = useState({
    restaurants: [],
    loading: true,
    error: null,
  });
  const { location, loading, error } = useContext(LocationContext);

  useEffect(() => {
    if (location) {
      fetchRestaurants(`${location?.lat},${location?.lng}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, location]);
  const handleState = (payload) => {
    setState((prevState) => ({ ...prevState, ...payload }));
  };
  const fetchRestaurants = async (loc) => {
    handleState({ loading: true, error: null, restaurants: [] });
    setTimeout(() => {
      restaurantRequest(loc)
        .then(restaurantTransform)
        .then((restaurants) => {
          handleState({ loading: false, restaurants });
        })
        .catch((error) => {
          handleState({ loading: false, error });
        });
    }, 1000);
  };
  return (
    <RestaurantsContext.Provider value={state}>
      {children}
    </RestaurantsContext.Provider>
  );
};
