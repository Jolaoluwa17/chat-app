import { StyleSheet } from "react-native";

export const ProfileStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileTitle: {
    fontSize: 25,
    fontWeight: "600",
    marginTop: 20,
  },
  profilePicContainer: {
    display: "flex",
    alignItems: "center",
  },
  profilePic: {
    backgroundColor: "#08162E",
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    marginTop: 20,
  },
  formTitle: {
    fontSize: 15,
  },
  input: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 10,
    borderColor: "#e6e6e6",
  },
  formItem: {
    marginBottom: 20,
  },
  saveBtn: {
    width: "100%",
    paddingVertical: 18,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#08162E",
    borderRadius: 12,
    marginTop: 20,
  },
  deleteBtn: {
    width: "100%",
    paddingVertical: 18,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    borderRadius: 12,
    marginTop: 20,
  }
});
