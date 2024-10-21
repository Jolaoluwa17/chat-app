import { StyleSheet } from "react-native";

export const SetUpAccountStyle = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
  },
  setUpAccountContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  subTitle: {
    marginTop: 10,
    fontSize: 15,
    color: "grey",
  },
  profileTabContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  profileTab: {
    height: 200,
    width: 200,
    borderRadius: 100,
    backgroundColor: "#08162E",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  initials: {
    color: "white",
    fontSize: 50,
  },
  nameTextinput: {
    width: "100%",
    padding: 8,
    paddingLeft: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginTop: 30,
    paddingVertical: 15,
  },
  continueBtnContainer: {
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
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
