import React, { useState } from "react";
import { SafeArea } from "../../../components/utility/safe-area-component";
import RestaurantInfoCard from "../components/restaurant-info-card.component";
import { List ,} from "react-native-paper";
import { ScrollView } from "react-native";


export function RestaurantDetailsScreen({ route }) {
  const { restaurant } = route?.params;
  const [state, setState] = useState({
    breakFastExpanded: false,
    lunchExpanded: false,
    dinnerExpanded: false,
    drinksExpanded: false,
  });

  const handleState = (payload) => {
    setState((prev) => ({ ...prev, ...payload }));
  };
  return (
    <SafeArea>
      <RestaurantInfoCard restaurant={restaurant}  />
      <ScrollView>
      <List.Accordion
      
        title="Breakfast"
        left={(props) => <List.Icon {...props} icon={"bread-slice"} />}
        expanded={state.breakFastExpanded}
        onPress={() => {
          handleState({ breakFastExpanded: !state.breakFastExpanded });
        }}
      >
        <List.Item title="Sandwich"></List.Item>
        
        <List.Item title="Garlic bread"></List.Item>
      </List.Accordion>
      <List.Accordion
        title="Lunch"
        left={(props) => <List.Icon {...props} icon={"hamburger"} />}
        expanded={state.lunchExpanded}
        onPress={() => {
          handleState({ lunchExpanded: !state.lunchExpanded });
        }}
      >

<List.Item title="Fried Rice"></List.Item>
        <List.Item title="Noodles"></List.Item>
        <List.Item title="Biryani"></List.Item>
      </List.Accordion>
      <List.Accordion
        title="Dinner"
        left={(props) => <List.Icon {...props} icon={"food-variant"} />}
        expanded={state.dinnerExpanded}
        onPress={() => {
          handleState({ dinnerExpanded: !state.dinnerExpanded });
        }}
      >
        <List.Item title="Fried Rice"></List.Item>
        <List.Item title="Noodles"></List.Item>
      </List.Accordion>
      <List.Accordion
        title="Drinks"
        left={(props) => <List.Icon {...props} icon={"cup"} />}
        expanded={state.drinksExpanded}
        onPress={() => {
          handleState({ drinksExpanded: !state.drinksExpanded });
        }}
      >

        <List.Item title="Sprite"></List.Item>
        <List.Item title="Pepsi"></List.Item>
      </List.Accordion>
      </ScrollView>
    </SafeArea>
  );
}
