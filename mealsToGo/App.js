import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import { Text,Button } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { theme } from "./src/infrastructure/theme";

import { SafeArea } from "./src/components/utility/safe-area-component";
import { RestaurantScreen } from "./src/features/restaurants/screens/restaurants.screen";
import { RestaurantsContextProvider } from "./src/services/restaurants/restaurants.context";
import { LocationContextProvider } from "./src/services/location/location.context";
import { Navigation } from "./src/infrastructure/navigation";
import { FavouritesContextProvider } from "./src/services/favourites/favourites.context";

import { initializeApp } from "firebase/app";

import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";

const firebaseConfig = {
  apiKey: "AIzaSyB24W-O2gRlJb17pkUpCY07Os5Xzom3Ew8",
  authDomain: "mealstogo-58edd.firebaseapp.com",
  projectId: "mealstogo-58edd",
  storageBucket: "mealstogo-58edd.appspot.com",
  messagingSenderId: "345569017855",
  appId: "1:345569017855:web:27c3c0ec11eea60a06f1ca",
};

initializeApp(firebaseConfig);


const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Restaurants: "md-restaurant",
  Map: "md-map",
  Settings: "md-settings",
};

const Settings = () => {
  const {onLogout}=useContext(AuthenticationContextProvider)
 return <SafeArea>
    <Text>Settings</Text>
    <Button onPress={onLogout}>Logout</Button>
  </SafeArea>
}
const Map = () => (
  <SafeArea>
    <Text>Map</Text>
  </SafeArea>
);

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),

    tabBarActiveTintColor: "tomato",
    tabBarInactiveTintColor: "gray",
  };
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <AuthenticationContextProvider>
        <ThemeProvider theme={theme}>
          {/* <FavouritesContextProvider>
            <LocationContextProvider>
              <RestaurantsContextProvider> */}
              
                <Navigation />
              {/* </RestaurantsContextProvider>
            </LocationContextProvider> commenting this as we logout it doesnt clear data so moving it appNavigator
          </FavouritesContextProvider> */} 
        </ThemeProvider>
        <ExpoStatusBar style="auto" />
      </AuthenticationContextProvider>
    </>
  );
}
{/* <AuthenticationContextProvider>
        <ThemeProvider theme={theme}>
          <FavouritesContextProvider>
            <LocationContextProvider>
              <RestaurantsContextProvider>
                {/* <NavigationContainer>
              <Tab.Navigator screenOptions={createScreenOptions}>
                <Tab.Screen name="Restaurants" component={RestaurantScreen} />
                <Tab.Screen name="Map" component={Map} />
                <Tab.Screen name="Settings" component={Settings} />
              </Tab.Navigator>
            </NavigationContainer> */}
               // <Navigation />
      //         </RestaurantsContextProvider>
      //       </LocationContextProvider>
      //     </FavouritesContextProvider>
      //   </ThemeProvider>
      //   <ExpoStatusBar style="auto" />
      // </AuthenticationContextProvider> */}
// function MyTabs() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === "Restaurants") {
//             iconName = focused ? "md-restaurant" : "md-restaurant";
//           } else if (route.name === "Settings") {
//             iconName = focused ? "md-settings" : "md-settings";
//           } else if (route.name === "Map") {
//             iconName = focused ? "md-map" : "md-map";
//           }

//           // You can return any component that you like here!
//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: "tomato",
//         tabBarInactiveTintColor: "gray",
//       })}
//     >
//       <Tab.Screen name="Restaurants" component={RestaurantScreens} />
//       <Tab.Screen name="Map" component={MapScreen} />
//       <Tab.Screen name="Settings" component={SettingsScreen} />
//     </Tab.Navigator>
//   );
// }
