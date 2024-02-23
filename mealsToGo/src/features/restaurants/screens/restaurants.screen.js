import React, { useContext, useState } from "react";

import RestaurantInfoCard from "../components/restaurant-info-card.component";
import styled from "styled-components/native";

import { View, FlatList, Pressable } from "react-native";

import { ActivityIndicator, MD3Colors, Searchbar } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area-component";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import Search from "../components/search.component";
import { FavouritesContext } from "../../../services/favourites/favourites.context";
import { FavouritesBar } from "../../../components/favourites/favourites-bar.component";


const SearchContainer = styled(View)`
  padding-right: ${(props) => props.theme.space[3]};
  padding-left: ${(props) => props.theme.space[3]};
  padding-bottom: ${(props) => props.theme.space[2]};
`;
const Loader = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoaderContainer = styled(View)`
  position: absolute;
  top: 50%;
  left: 50%;
`;
// const RestaurantListContainer = styled(View)`
//   padding: ${(props) => props.theme.space[3]};
//   flex: 1;
// `;

// const RestaurantList = styled(FlatList)`
//   padding: ${(props) => props.theme.space[3]};
// `;

const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

export function RestaurantScreen({ navigation }) {//when u use stacks navigation u by default have a prop called navigation
  const { restaurants, loading, error } = useContext(RestaurantsContext);
const [isFavouritesToggled,setIsFavouritesToggled]=useState(false)
  const {favourites}=useContext(FavouritesContext)
  return (
    <SafeArea>
      {/* <View style={styles.search}>
        <Searchbar placeholder="Enter a value" />
      </View> */}

      {/* <SearchContainer>
        <Searchbar placeholder="Enter a value" />
      </SearchContainer> */}
      <Search onFavouritesToggle={()=>setIsFavouritesToggled(!isFavouritesToggled)} isFavouritesToggled={isFavouritesToggled} />
      {isFavouritesToggled?<FavouritesBar favourites={favourites} onNavigate={navigation.navigate}/>:null}
      {/* <RestaurantListContainer>
        <RestaurantInfoCard />
      </RestaurantListContainer> */}
      {loading ? (
        <LoaderContainer>
          <Loader size={50} animating={true} color={MD3Colors.blue} />
        </LoaderContainer>
      ) : (
        <RestaurantList
          data={restaurants}
          keyExtractor={(item, i) => {
            return ` ${item.placeId} ${Math.random()}`;
          }}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => {
            return (
              <Pressable
                onPress={() => navigation.navigate("RestaurantDetail",{restaurant:item})}
              >
                <Spacer aposition={"bottom"} size="large">
                  <RestaurantInfoCard restaurant={item} />
                </Spacer>
              </Pressable>
            );
          }}
        />
      )}
    </SafeArea>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: Platform?.OS === "android" ? StatusBar?.currentHeight : 0,
//     // backgroundColor: "#fff",
//     // alignItems: "center",
//     // justifyContent: "center",
//   },
//   search: {
//     padding: 16,
//   },
//   list: {
//     padding: 16,
//     flex: 1,
//     backgroundColor: "blue",
//   },
// });
