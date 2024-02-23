import React,{useContext} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Text,Button } from "react-native";
import { SafeArea } from "../../components/utility/safe-area-component";

import { RestaurantScreen } from "../../features/restaurants/screens/restaurants.screen";
import { RestaurantNavigator } from "./restaurants.navigator";
import { MapScreen } from "../../features/map/screens/map.screen";
import { AuthenticationContext, AuthenticationContextProvider } from "../../services/authentication/authentication.context";
import { FavouritesContextProvider } from "../../services/favourites/favourites.context";
import { LocationContextProvider } from "../../services/location/location.context";
import { RestaurantsContextProvider } from "../../services/restaurants/restaurants.context";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Restaurants: "md-restaurant",
  Map: "md-map",
  Settings: "md-settings",
};

const Settings = () => {
  const {onLogout}=useContext(AuthenticationContext)
 return <SafeArea>
    <Text>Settings</Text>
    <Button onPress={onLogout} title={"Logout"}></Button>
  </SafeArea>
}
// const Map = () => (
//   <SafeArea>
//     <Text>Map</Text>
//   </SafeArea>
// );

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color || ""} />
    ),
    tabBarActiveTintColor: "tomato",
    tabBarInactiveTintColor: "gray",
  };
};

export const AppNavigator = () => (
  // <NavigationContainer>//commenting as we have it in index file
  <FavouritesContextProvider>
    <LocationContextProvider>
      <RestaurantsContextProvider>
    <Tab.Navigator screenOptions={createScreenOptions}>
      {/* <Tab.Screen name="Restaurants" component={RestaurantScreen} /> */}
      <Tab.Screen
        name="Restaurants"
        component={RestaurantNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name="Map" component={MapScreen} options={{        
        headerShown:false
      }}/>
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
    </RestaurantsContextProvider>
    </LocationContextProvider>
    </FavouritesContextProvider>
    
  // </NavigationContainer>
);

