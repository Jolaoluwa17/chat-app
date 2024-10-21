import { StyleSheet } from "react-native";

export const LoginStyle = StyleSheet.create({
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
  countrySelection: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 30,
  },
  phoneNo_input: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    height: 60,
    paddingLeft: 12,
    paddingRight: 12,
  },
  countryCode: {
    width: 50,
    fontSize: 15,
  },
  input: {
    fontSize: 15,
    width: "100%",
  },
  emailInput: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    height: 60,
    paddingLeft: 12,
    paddingRight: 12,
  },
  continueBtnContainer: {
    width: "100%",
    paddingLeft: 12,
    paddingRight: 12,
    position: "absolute",
    bottom: 30,
  },
  continueBtn: {
    width: "100%",
    backgroundColor: "#08162E",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    height: 50,
  },
});
