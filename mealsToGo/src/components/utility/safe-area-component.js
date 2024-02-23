import styled from "styled-components/native";

import { SafeAreaView, Platform, StatusBar } from "react-native";

// export const SafeArea = styled(SafeAreaView)`
//   flex: 1;
//   margin-top: ${Platform?.OS === "android" ? StatusBar?.currentHeight : 0}px;
// `;

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar?.currentHeight && `margin-top: ${StatusBar?.currentHeight}px;`}
  background-color:${props=>props?.theme?.colors?.bg?.primary}
`;
