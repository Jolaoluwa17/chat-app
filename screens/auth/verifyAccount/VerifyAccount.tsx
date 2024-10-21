import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { VerifyAccountStyle } from "./VerifyAccountStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import OTPInput from "../../../components/OtpInput";
import ArrowLeftIcon from "../../../assets/icons/ArrowLeftIcon";
import { useVerifyEmailMutation } from "../../../services/auth/authApiSlice";
import ToastNotification from "../../../components/Toast";
import { RootState } from "../../../services/store";
import { useSelector } from "react-redux";
import { saveCredentials } from "../../../services/auth/authSlice";
import { useAppDispatch } from "../../../services/hooks";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

interface Props {
  navigation: any;
}

const VerifyAccount: React.FC<Props> = ({ navigation }) => {
  const [timer, setTimer] = useState<number>(120); // 2 minutes in seconds
  const [isResendVisible, setIsResendVisible] = useState<boolean>(false);
  const [otp, setOtp] = useState("");
  const user = useSelector((state: RootState) => state.auth.user);
  const email = user?.email;

  useEffect(() => {
    if (timer === 0) {
      setIsResendVisible(true);
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [textToast, setTextToast] = useState("");
  const [verifyAccount] = useVerifyEmailMutation();
  const dispatch = useAppDispatch();

  const handleVerifyAccount = async () => {
    setIsLoading(true);
    const otpData = {
      email: email,
      otp: otp,
    };
    try {
      const res = await verifyAccount(otpData).unwrap();
      const { accessToken, refreshToken } = res;

      // Dispatch the action to save credentials in the Redux store
      dispatch(
        saveCredentials({ accessToken, refreshToken, user: { ...user } })
      );
      setIsLoading(false);
      navigation.navigate("setUpAccount");
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

  const isFormFilled = otp.trim().length === 4;

  return (
    <SafeAreaView style={VerifyAccountStyle.container}>
      {showToast && (
        <ToastNotification
          error={true}
          text={textToast}
          setShowToast={setShowToast}
        />
      )}
      <TouchableOpacity onPress={() => navigation.navigate("login")}>
        <ArrowLeftIcon />
      </TouchableOpacity>
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        style={{ height: "100%" }}
      >
        <Text style={VerifyAccountStyle.instructions}>
          Enter the OTP to verify your email
        </Text>
        <View style={VerifyAccountStyle.otpContainer}>
          <OTPInput otp={otp} setOtp={setOtp} />
        </View>
        <View style={VerifyAccountStyle.resendContainer}>
          <Text style={{ color: "#c0c0c0", fontWeight: "600" }}>
            {isResendVisible ? (
              <Text>
                Didn't get the code?
                <Text style={{ color: "#50aeee" }}> Resend</Text>
              </Text>
            ) : (
              `Didn't get the code? Resend in ${formatTime(timer)}`
            )}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <View style={VerifyAccountStyle.confirmBtnContainer}>
        <TouchableOpacity
          style={[
            VerifyAccountStyle.confirmBtn,
            {
              backgroundColor: isFormFilled || isLoading ? "#08162E" : "grey",
            },
          ]}
          onPress={handleVerifyAccount}
          disabled={isLoading || !isFormFilled}
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
  );
};

export default VerifyAccount;
