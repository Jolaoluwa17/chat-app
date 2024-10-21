import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import AuthNavigator from "./navigator/AuthNavigator";
import AppNavigator from "./navigator/AppNavigator";
import * as SecureStore from "expo-secure-store";

const RootStack = createStackNavigator();

export const RootComponent: React.FC = () => {
  const [user, setUser] = useState(null);
  const [authenticated, isAuthenticated] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Get the user string from SecureStore
        const userString = await SecureStore.getItemAsync("user");

        // If userString is not null, parse it into an object
        if (userString) {
          const userData = JSON.parse(userString);
          setUser(userData); // Set the user state
        }
      } catch (error) {
        console.error("Error fetching user from SecureStore:", error);
      }
    };

    fetchUser(); // Call the fetchUser function
  }, []);

  useEffect(() => {
    if (user) {
      isAuthenticated(true);
    } else {
      isAuthenticated(false);
    }
  }, [isAuthenticated, user]);


  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {authenticated ? (
        <RootStack.Screen name="AppNavigator" options={{ headerShown: false }}>
          {(props) => <AppNavigator />}
        </RootStack.Screen>
      ) : (
        <RootStack.Screen name="AuthNavigator" options={{ headerShown: false }}>
          {(props) => <AuthNavigator />}
        </RootStack.Screen>
      )}
    </RootStack.Navigator>
  );
};
