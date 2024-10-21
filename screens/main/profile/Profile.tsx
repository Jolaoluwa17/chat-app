import { View, Text, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProfileStyle } from "./profileStyle";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../../services/user/userSlice";
import { useAppDispatch } from "../../../services/hooks";
import { logout } from "../../../services/auth/authSlice";
import { UserType } from "../../../types/types";
import * as SecureStore from "expo-secure-store";

const Profile = () => {
  const [loggedinUser, setUser] = useState<UserType | null>(null);

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
        console.log("Error fetching user from SecureStore:", error);
      }
    };

    fetchUser(); // Call the fetchUser function
  }, []);

  const {
    data: user,
    error,
    isLoading,
  } = useGetUserByIdQuery(loggedinUser ? loggedinUser._id : "", {
    skip: !loggedinUser,
  });
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");

  // Fetch user info by ID and set the input values
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhoneNo(user.phoneNo || "");
      setEmail(user.email || "");
    }
  }, [user]);

  // Handle form submission
  const handleSubmit = async () => {
    try {
      await updateUser({ id: user._id, name, phoneNo, email }).unwrap();
      // Optionally, show a success message or navigate back
      console.log("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const getInitials = (fullName: string | undefined) => {
    if (!fullName) return "NA";

    const nameArray = fullName.trim().split(" ");

    // Only process the first two words for initials
    const initials = nameArray
      .slice(0, 2)
      .map((name) => name.charAt(0).toUpperCase())
      .join("");

    return initials;
  };

  const dispatch = useAppDispatch();

  const handleLogOut = async () => {
    try {
      // Delete the user from SecureStore
      await SecureStore.deleteItemAsync("accessToken");
      await SecureStore.deleteItemAsync("refreshToken");
      await SecureStore.deleteItemAsync("user");
      console.log("user deleted");
    } catch (error) {
      console.log("Error fetching user from SecureStore:", error);
    }
  };

  return (
    <SafeAreaView style={ProfileStyle.container}>
      <Text style={ProfileStyle.profileTitle}>Profile</Text>
      <View style={ProfileStyle.profilePicContainer}>
        <View style={ProfileStyle.profilePic}>
          <Text style={{ color: "white", fontSize: 24 }}>
            {getInitials(user?.name)}
          </Text>
        </View>
      </View>
      <View style={ProfileStyle.form}>
        <View style={ProfileStyle.formItem}>
          <Text style={ProfileStyle.formTitle}>Name</Text>
          <TextInput
            style={ProfileStyle.input}
            value={name}
            onChangeText={setName} // Make input editable
          />
        </View>
        <View style={ProfileStyle.formItem}>
          <Text style={ProfileStyle.formTitle}>Phone No</Text>
          <TextInput
            style={ProfileStyle.input}
            value={phoneNo}
            onChangeText={setPhoneNo} // Make input editable
          />
        </View>
        <View style={ProfileStyle.formItem}>
          <Text style={ProfileStyle.formTitle}>Email</Text>
          <TextInput
            style={ProfileStyle.input}
            value={email}
            onChangeText={setEmail} // Make input editable
          />
        </View>
        <TouchableOpacity
          style={[
            ProfileStyle.saveBtn,
            isUpdating && { backgroundColor: "grey" },
          ]}
          onPress={handleSubmit}
          disabled={isUpdating}
        >
          <Text style={{ color: "white", fontSize: 14, fontWeight: "600" }}>
            {isUpdating ? "Updating..." : "Confirm"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={ProfileStyle.deleteBtn} onPress={handleLogOut}>
          <Text style={{ color: "white", fontSize: 14, fontWeight: "600" }}>
            Delete Account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
