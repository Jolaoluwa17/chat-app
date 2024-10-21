import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Platform, View } from "react-native";
import StudentHomeIcon from "../assets/icons/StudentHomeIcon";
import StudentProfileIcon from "../assets/icons/StudentProfileIcon";
import Chat from "../screens/main/chat/Chat";
import Profile from "../screens/main/profile/Profile";

const Tab = createBottomTabNavigator();

interface BottomNavProp {
  navigation: any;
}

const BottomNavigator: React.FC<BottomNavProp> = ({ navigation }) => {
  const renderProfile = (props: any) => <Profile {...props} />;

  return (
      <Tab.Navigator
        initialRouteName="Chat"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            backgroundColor: "rgba(8, 22, 46, 1)",
            height: 64,
            right: 10,
            left: 10,
            bottom: 30,
            borderRadius: 16,
            borderTopWidth: 0,
            ...Platform.select({
              ios: {
                flexDirection: "row",
                alignItems: "center",
              },
              android: {},
            }),
          },
        }}
      >
        <Tab.Screen
          name="Chat"
          component={Chat}
          options={{
            tabBarIcon: ({ focused }) => (
              <View hitSlop={{ left: 15, right: 15, bottom: 15, top: 15 }}>
                <StudentHomeIcon focused={focused} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          options={{
            tabBarIcon: ({ focused }) => (
              <View hitSlop={{ left: 15, right: 15, bottom: 15, top: 15 }}>
                <StudentProfileIcon focused={focused} />
              </View>
            ),
          }}
        >
          {renderProfile}
        </Tab.Screen>
      </Tab.Navigator>
  );
};

export default BottomNavigator;
