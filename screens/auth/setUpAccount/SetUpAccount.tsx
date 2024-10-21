import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import { SetUpAccountStyle } from "./setUpAccountStyle";
import { RootState } from "../../../services/store";
import { useAppDispatch } from "../../../services/hooks";
import { saveCredentials } from "../../../services/auth/authSlice";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useUpdateUserMutation } from "../../../services/auth/authApiSlice";

interface Props {
  navigation: any;
}

const SetUpAccount: React.FC<Props> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [textToast, setTextToast] = useState("");
  const [name, setName] = useState("");
  const user = useSelector((state: RootState) => state.auth.user);
  const email = user?.email;
  const [updateUser] = useUpdateUserMutation();
  const dispatch = useAppDispatch();

  const handleUpdateUser = async () => {
    console.log("btn clicked");

    setIsLoading(true);
    const updateData = {
      email: email,
      name: name,
    };
    try {
      const res = await updateUser(updateData).unwrap();
      console.log(res);
      const { user } = res;

      if (user) {
        dispatch(
          saveCredentials({ accessToken: "", refreshToken: "", user: user })
        );
      }
      console.log("done");
    } catch (error: unknown) {
      if (error instanceof Error && (error as any).status) {
        const status = (error as any).status;
        if (status === 404 || status === 400) {
          setShowToast(true);
          setTextToast("Invalid email");
        }
      } else {
        setShowToast(true);
        setTextToast("Something went wrong");
      }
      setIsLoading(false);
    }
  };

  const isFormFilled = name.trim().length > 0;

  const getInitials = (fullName: string | undefined) => {
    if (!fullName) return "";

    const nameArray = fullName.trim().split(" ");

    // Only process the first two words for initials
    const initials = nameArray
      .slice(0, 2)
      .map((name) => name.charAt(0).toUpperCase())
      .join("");

    return initials;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={SetUpAccountStyle.container}>
        <View style={SetUpAccountStyle.setUpAccountContainer}>
          <Text style={SetUpAccountStyle.title}>Finish Setting Up</Text>
          <Text style={SetUpAccountStyle.subTitle}>
            Please add your name to finish setting up your account and begin
            connecting with people
          </Text>
          <View style={SetUpAccountStyle.profileTabContainer}>
            <View style={SetUpAccountStyle.profileTab}>
              <Text style={SetUpAccountStyle.initials}>
                {getInitials(name)}
              </Text>
            </View>
            <TextInput
              style={SetUpAccountStyle.nameTextinput}
              placeholder="Enter your name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
        </View>
        <View style={SetUpAccountStyle.continueBtnContainer}>
          <TouchableOpacity
            style={[
              SetUpAccountStyle.continueBtn,
              {
                backgroundColor: isFormFilled || isLoading ? "#08162E" : "grey",
              },
            ]}
            onPress={handleUpdateUser}
            disabled={!isFormFilled || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={{ color: "white", fontSize: 15, fontWeight: "600" }}>
                Continue
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SetUpAccount;
