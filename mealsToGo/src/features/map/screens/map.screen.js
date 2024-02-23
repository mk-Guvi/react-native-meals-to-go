import MapView,{Marker,Callout} from "react-native-maps";
import React, { useState, useContext, Fragment, useEffect } from "react";
import styled from "styled-components/native";
import Search from "../components/search.component";
import { LocationContext } from "../../../services/location/location.context";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { MapCalloutComponent } from "../components/map-callout.component";

export function MapScreen({ navigation }) {
  const {
    location: { viewport, lat, lng },
  } = useContext(LocationContext);
  const { restaurants = [] } = useContext(RestaurantsContext);
  const [latDelta, setLatDelta] = useState(0);
  useEffect(() => {
    const northeastLat = viewport?.northeast?.lat;
    const southwestLat = viewport?.southwest?.lat;

    setLatDelta(northeastLat - southwestLat);
  }, [lat, lng, viewport]);

  return (
    <Fragment>
      <Search />
      <Map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.02,
        }}
      >
        {restaurants?.map((eachRestaurant) => {
          
          return (
            <Marker
              key={eachRestaurant?.name}
              title={eachRestaurant.name}
              coordinate={{
                latitude: eachRestaurant?.geometry?.location?.lat,
                longitude: eachRestaurant?.geometry?.location?.lng,
              }}
            >
              <Callout
                onPress={() => {
                  navigation?.navigate("RestaurantDetail", {
                    restaurant: eachRestaurant,
                  });
                }}
              >
                <MapCalloutComponent restaurant={eachRestaurant} />
              </Callout>
            </Marker>
          );
        })}
      </Map>
    </Fragment>
  );
}
const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;
