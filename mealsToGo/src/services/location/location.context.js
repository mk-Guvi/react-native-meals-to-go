import React, { useState, createContext, useEffect } from "react";
import { locationRequest, locationTransform } from "./location.service";

export const LocationContext = createContext();

export const LocationContextProvider = ({ children }) => {
  const [state, setState] = useState({
    location: "",
    loading: false,
    error: null,
    keyword: "san francisco",
  });

  const handleState = (payload) => {
    setState((prevState) => ({ ...prevState, ...payload }));
  };

  const onSearch = async (keyword) => {
    handleState({ loading: true, error: null, keyword });
  };

  useEffect(() => {
    if (state.keyword?.length) {
      setTimeout(() => {
        locationRequest(state.keyword?.toLowerCase())
          .then(locationTransform)
          .then((location) => {            
            handleState({ loading: false, location });
          })
          .catch((error) => {
            handleState({ loading: false, error });
            console.log(error);
          });
      }, 2000);
    } else {
      handleState({ error: null, loading: false });
    }
  }, [state.keyword]);
  return (
    <LocationContext.Provider value={{ ...state, onSearch }}>
      {children}
    </LocationContext.Provider>
  );
};
