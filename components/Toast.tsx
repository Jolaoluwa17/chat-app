import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import { useEffect } from "react";

interface ToastNotificationProps {
  error: boolean;
  text: string;

  setShowToast: any;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({
  text,
  error,
  setShowToast,
}) => {
  useEffect(() => {
    const toastTimeout = setTimeout(() => {
      setShowToast(false);
    }, 10000); // Set showToast back to false after 10 seconds
    return () => clearTimeout(toastTimeout);
  }, []);

  return (
    <View style={styles.main}>
      <Animated.View
        entering={FadeInUp}
        exiting={FadeOutUp}
        style={styles.toast_Root}
      >
        {!error ? (
          <Image
            source={require("../assets/images/Ellipse.png")}
          />
        ) : (
          <Image
            source={require("../assets/images/EllipseError.png")}
          />
        )}
        <View>
          <Text
            style={{
              color: "white",
              fontWeight: "600",
              marginLeft: 10,
              fontSize: 14,
            }}
          >
            {text}
          </Text>
        </View>
      </Animated.View>
    </View>
  );
};

export default ToastNotification;

const styles = StyleSheet.create({
  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99,
    position: "absolute",
    width: "100%",
  },
  toast_Root: {
    top: 50,
    backgroundColor: "#08162E",
    borderRadius: 12,
    padding: 14,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
