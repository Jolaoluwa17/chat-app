import React, { useState, useRef } from "react";
import { View, TextInput, StyleSheet } from "react-native";

interface Props {
  otp: string;
  setOtp: (otp: string) => void;
}

const OTPInput: React.FC<Props> = ({ otp, setOtp }) => {
  // Create refs for each input
  const inputRefs = Array(6)
    .fill(null)
    .map(() => useRef<TextInput>(null));

  const handleChange = (text: string, index: number) => {
    const newOtp = otp.split("");
    newOtp[index] = text;
    setOtp(newOtp.join(""));

    // Move focus to the next input
    if (text && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key === "Backspace" && index > 0) {
      // Move focus to the previous input
      inputRefs[index - 1].current?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <TextInput
            key={index}
            ref={inputRefs[index]}
            style={styles.box}
            maxLength={1}
            keyboardType="numeric"
            value={otp[index] || ""}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) =>
              handleKeyPress(index, nativeEvent.key)
            }
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignSelf: "center",
    marginTop: 20,
  },
  box: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    width: 60,
    height: 70,
    textAlign: "center",
    fontSize: 18,
  },
});

export default OTPInput;
