import { View } from "react-native";
import React from "react";
import Svg from "react-native-svg";
import { Path } from "react-native-svg";

interface SearchIconProps {
  color?: string;
}

const SendArrowIcon: React.FC<SearchIconProps> = ({ color = "#141718" }) => {
  return (
    <View>
      <Svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <Path
          d="M18.0693 8.51062L9.50929 4.23062C3.75929 1.35062 1.39929 3.71062 4.27929 9.46062L5.14929 11.2006C5.39929 11.7106 5.39929 12.3006 5.14929 12.8106L4.27929 14.5406C1.39929 20.2906 3.74929 22.6506 9.50929 19.7706L18.0693 15.4906C21.9093 13.5706 21.9093 10.4306 18.0693 8.51062ZM14.8393 12.7506H9.43929C9.02929 12.7506 8.68929 12.4106 8.68929 12.0006C8.68929 11.5906 9.02929 11.2506 9.43929 11.2506H14.8393C15.2493 11.2506 15.5893 11.5906 15.5893 12.0006C15.5893 12.4106 15.2493 12.7506 14.8393 12.7506Z"
          fill="#08162E"
        />
      </Svg>
    </View>
  );
};

export default SendArrowIcon;
