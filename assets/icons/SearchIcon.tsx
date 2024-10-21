import { View } from "react-native";
import React from "react";
import Svg from "react-native-svg";
import { Path } from "react-native-svg";

interface SearchIconProps {
  color?: string;
}

const SearchIcon: React.FC<SearchIconProps> = ({ color = "#141718" }) => {
  return (
    <View>
      <Svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <Path
          d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
          stroke="#6C7275"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M22 22L20 20"
          stroke="#6C7275"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

export default SearchIcon;
