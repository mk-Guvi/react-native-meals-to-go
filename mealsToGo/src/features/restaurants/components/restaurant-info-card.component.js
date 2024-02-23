import React from "react";

import { StyleSheet } from "react-native";

import { SvgXml } from "react-native-svg";
import star from "../../../../assets/star";
import open from "../../../../assets/open";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";

import {
  RestaurantCard,
  RestaurantCardCover,
  Info,
  Section,
  SectionEnd,
  Rating,
  Icon,
  Address,
} from "./restaurant-info-card.styles";
import { Favourite } from "../../../components/favourites/favourite.component";

// const Title = styled(Text)`
//   font-family: ${(props) => props.theme.fonts.heading};
//   font-size: ${(props) => props.theme.fontSizes.body};
//   color: ${(props) => props.theme.colors.ui.success};
// `;

function RestaurantInfoCard({ restaurant = {} }) {
  const {
    name = "First",
    icon = "https://www.gravatar.com/avatar/f80d17c0d8831cb6276eea062ee9d7c7?s=256&d=identicon&r=PG&f=1",
    photos = [
      "https://www.gravatar.com/avatar/f80d17c0d8831cb6276eea062ee9d7c7?s=256&d=identicon&r=PG&f=1",
    ],
    address = "sdaosijd smdaisd osadioasdo",
    isOpenNow = true,
    rating = 5,
    isClosedTemporarily = true,
    placeId,
  } = restaurant;

  const ratingArray = Array.from(new Array(Math.floor(rating)));

  return (
    <RestaurantCard elevation={5} key={name}>
      <Favourite restaurant={restaurant}/>
      <RestaurantCardCover key={name} source={{ uri: photos[0] }} />
      <Info>
        <Text variant="label">{name}</Text>
        <Section>
          <Rating>
            {ratingArray.map((_, i) => (
              <SvgXml
                xml={star}
                width={20}
                height={20}
                key={`star-${placeId}-${i}`}
              />
            ))}
          </Rating>
          <SectionEnd>
            {isClosedTemporarily && (
              <Text variant="error">CLOSED TEMPORARILY</Text>
            )}
            <Spacer position="left" size="large">
              {isOpenNow && <SvgXml xml={open} width={20} height={20} />}
            </Spacer>
            <Spacer position="left" size="large">
              <Icon source={{ uri: icon }} />
            </Spacer>
          </SectionEnd>
        </Section>
        <Address>{address}</Address>
      </Info>
    </RestaurantCard>
  );
}

export default RestaurantInfoCard;

const styles = StyleSheet.create({
  card: { backgroundColor: "white" },
  cover: { padding: 20, backgroundColor: "white" },
});
