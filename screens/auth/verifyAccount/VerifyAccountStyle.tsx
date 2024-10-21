import { StyleSheet } from "react-native";

export const VerifyAccountStyle = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    width: "100%",
  },
  instructions: {
    textAlign: "center",
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 30,
    fontSize: 15,
  },
  otpContainer: {
    paddingHorizontal: 20,
  },
  resendContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    fontSize: 15,
  },
  confirmBtnContainer: {
    width: "100%",
    paddingLeft: 12,
    paddingRight: 12,
    position: "absolute",
    bottom: 30,
  },
  confirmBtn: {
    width: "100%",
    backgroundColor: "#50aeee",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    height: 50,
    zIndex: 2,
  },
});
