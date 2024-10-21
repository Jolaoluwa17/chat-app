import { StyleSheet } from "react-native";

export const MessagesStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 10,
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  profilePic: {
    width: 40,
    height: 40,
    backgroundColor: "#08162E",
    borderRadius: 20,
  },
  userDetails: {
    marginLeft: 10,
  },
  sendMessageInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
    padding: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  textInputContainer: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    padding: 10,
    zIndex: 99,
    backgroundColor: "white",
  },
  sendArrowIcon: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  messageBoxContainer: {
    width: "100%",
    // backgroundColor: "red"
    // paddingBottom: 15,
    // backgroundColor: "red"
  },
  messageBox: {
    paddingHorizontal: 10,
    padding: 10,
    maxWidth: 200,
    backgroundColor: "#ccc",
    borderRadius: 10,
    marginTop: 30,
  },
});
