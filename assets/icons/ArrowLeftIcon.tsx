import { View } from 'react-native';
import React from 'react';
import Svg from 'react-native-svg';
import { Path } from 'react-native-svg';

interface ArrowLeftIconProps {
  color?: string;
}

const ArrowLeftIcon: React.FC<ArrowLeftIconProps> = ({ color = '#141718' }) => {
  return (
    <View style={{ padding: 10 }}>
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
          d="M9.57 5.93018L3.5 12.0002L9.57 18.0702"
          stroke={color}
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M20.4999 12H3.66992"
          stroke={color}
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </View>
  );
};

export default ArrowLeftIcon;
