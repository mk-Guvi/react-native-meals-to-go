import React from "react";
import { createStackNavigator,TransitionPresets } from "@react-navigation/stack";
import { RestaurantScreen } from "../../features/restaurants/screens/restaurants.screen";
import { Text } from "react-native-paper";
import { RestaurantDetailsScreen } from "../../features/restaurants/screens/restaurant-details.screen";

const RestaurantStack = createStackNavigator();
const RestaurantDetail = () => <Text>RestaurantDetails</Text>;
export const RestaurantNavigator = () => {
  return (
    <RestaurantStack.Navigator
      screenOptions={{
        headerMode: "none",//hides header with screen name,
      ...TransitionPresets.ModalPresentationIOS
      }}
    >
      <RestaurantStack.Screen name="Restaurant" component={RestaurantScreen} />
      <RestaurantStack.Screen
        name="RestaurantDetail"
        component={RestaurantDetailsScreen}
      />
    </RestaurantStack.Navigator>
  );
};
