import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import BottomNavigator from "./BottomNavigator";
import Messages from "../screens/main/messages/Messages";
import Contact from "../screens/main/contacts/Contact";

const AppStack = createStackNavigator();

const AppNavigator = () => {
  return (
    <AppStack.Navigator
      initialRouteName="BottomNavigator"
      screenOptions={{ headerShown: false }}
    >
      <AppStack.Screen
        name="BottomNavigator"
        component={BottomNavigator}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="Messages"
        component={Messages}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="Contact"
        component={Contact}
        options={{ headerShown: false }}
      />
    </AppStack.Navigator>
  );
};

export default AppNavigator;
