import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { LoginStyle } from "./LoginStyle";
import CustomDropdown from "../../../components/CustomDropDown";
import { useSignUpMutation } from "../../../services/auth/authApiSlice";
import ToastNotification from "../../../components/Toast";
import { saveCredentials } from "../../../services/auth/authSlice";
import { useAppDispatch } from "../../../services/hooks";

interface Props {
  navigation: any;
}

const countryData = [
  { label: "United States", value: "+1" },
  { label: "Canada", value: "+1" },
  { label: "United Kingdom", value: "+44" },
  { label: "Nigeria", value: "+234" },
  { label: "India", value: "+91" },
];

const Login: React.FC<Props> = ({ navigation }) => {
  const [selectedCountry, setSelectedCountry] = useState("+234");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [textToast, setTextToast] = useState("");
  const [signup] = useSignUpMutation();
  const dispatch = useAppDispatch();

  const handleSignUp = async () => {
    setIsLoading(true);
    const userData = {
      email: email,
      phoneNo: phoneNo,
    };
    try {
      const res = await signup(userData).unwrap();
      const { user } = res;

      if (user) {
        dispatch(
          saveCredentials({ accessToken: "", refreshToken: "", user: user._id })
        );
      }
      setIsLoading(false);
      navigation.navigate("verifyAccount");
    } catch (error: any) {
      if (error.status === 409 || error.status === 400) {
        setShowToast(true);
        setTextToast("Invalid email");
      } else {
        setShowToast(true);
        setTextToast("Something went wrong");
      }
      setIsLoading(false);
    }
  };

  const isFormComplete = email !== "" && phoneNo !== "";

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={LoginStyle.container}>
        {showToast && (
          <ToastNotification
            error={true}
            text={textToast}
            setShowToast={setShowToast}
          />
        )}
        <Text style={LoginStyle.instructions}>
          Please confirm your country code, and enter your phone number and
          email
        </Text>
        <View style={LoginStyle.countrySelection}>
          <CustomDropdown
            data={countryData}
            onSelect={(value) => setSelectedCountry(value)}
            placeholder="Select your country"
            defaultValue={selectedCountry}
          />
        </View>
        <View style={LoginStyle.phoneNo_input}>
          <Text style={LoginStyle.countryCode}>{selectedCountry}</Text>
          <TextInput
            style={LoginStyle.input}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            value={phoneNo}
            onChangeText={(text) => setPhoneNo(text)}
          />
        </View>
        <View style={LoginStyle.emailInput}>
          <TextInput
            style={LoginStyle.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={LoginStyle.continueBtnContainer}>
          <TouchableOpacity
            style={[
              LoginStyle.continueBtn,
              {
                backgroundColor:
                  isFormComplete || isLoading ? "#08162E" : "grey",
              },
            ]}
            onPress={handleSignUp}
            disabled={!isFormComplete || isLoading}
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

export default Login;
