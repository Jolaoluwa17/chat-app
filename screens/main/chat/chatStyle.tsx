import { StyleSheet } from "react-native";

export const ChatStyle = StyleSheet.create({
  container: {
    flex: 1, // Allow the container to take full screen height
    padding: 20,
  },
  chatTitle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleName: {
    fontSize: 18,
    fontWeight: "600",
  },
  chatsText: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "600",
  },
  chatsContainer: {
    flex: 1, // Allow this to take up available space
    marginTop: 10,
  },
  chatsBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  userInitials: {
    backgroundColor: "#08162E",
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  userDetails: {
    width: "60%",
  },
  userTiming: {
    alignItems: "flex-end",
    width: 50,
  },
  noMessages: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#08162E",
    alignItems: "center",
    justifyContent: "center",
  },
  peopleContainer: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 0,
    marginTop: 20,
    padding: 0,
    margin: 0,
  },
  peopleCircle: {
    backgroundColor: "#08162E",
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  peopleCircleContainer: {
    width: 90,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
