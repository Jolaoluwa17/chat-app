import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/auth/login/Login";
import VerifyAccount from "../screens/auth/verifyAccount/VerifyAccount";
import SetUpAccount from "../screens/auth/setUpAccount/SetUpAccount";

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="login"
      screenOptions={{ headerShown: false }}
    >
      <AuthStack.Screen
        name="login"
        component={Login}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="verifyAccount"
        component={VerifyAccount}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="setUpAccount"
        component={SetUpAccount}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
