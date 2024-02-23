/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";
import styled from "styled-components/native";

import { View } from "react-native";

import { LocationContext } from "../../../services/location/location.context";
const SearchContainer = styled(View)`
  padding-right: ${(props) => props.theme.space[3]};
  padding-left: ${(props) => props.theme.space[3]};
  padding-bottom: ${(props) => props.theme.space[2]};
  z-index: 999;
  position: absolute;
  top: 40px;
  width: 100%;
`;

function Search() {
  const { keyword, onSearch } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword || "");
  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);
  return (
    <SearchContainer>
      <Searchbar
      icon="map"
        placeholder="Search a location"
        value={searchKeyword || ""}
        onSubmitEditing={() => {
          onSearch(searchKeyword);
        }}
        onChangeText={setSearchKeyword}
      />
    </SearchContainer>
  );
}

export default Search;
