import React from 'react'
import {CompactRestaurantInfo} from "../../../components/restaurant/restaurant-compact-info-component"
export function MapCalloutComponent({restaurant}) {
  return (
    <CompactRestaurantInfo restaurant={restaurant} isMap={true} />
  )
}


