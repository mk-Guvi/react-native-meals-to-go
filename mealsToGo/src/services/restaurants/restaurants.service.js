import camelize from "camelize";
import { mockImages, mocks } from "./mock";

export const restaurantRequest = (location) => {
  return new Promise((resolve, reject) => {
    const mock = mocks[location];

    if (!mock) {
      reject("not found");
    }

    resolve(mock);
  });
};

export const restaurantTransform = ({ results = [] }) => {
  const mappedResults = results?.map((restaurant) => {
    restaurant.photos = restaurant?.photos?.map((p) => {
      return mockImages[Math.ceil(Math.random() * mockImages.length - 1)];
    });
    return {
      ...restaurant,
      isClosedTemporarily: restaurant.buisness_status === "CLOSED_TEMPORARILY",
      address: restaurant?.vicinity,
      isOpenNow:
        restaurant?.opening_hours && restaurant?.opening_hours?.open_now,
    };
  });
  return camelize(mappedResults);
};
