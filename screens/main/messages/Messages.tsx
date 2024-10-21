import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { MessagesStyle } from "./MessagesStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import ArrowLeftIcon from "../../../assets/icons/ArrowLeftIcon";
import SendArrowIcon from "../../../assets/icons/SendArrowIcon";
import { Socket } from "socket.io-client";
import useSocket from "../../../services/useSocket";
import {
  useFetchMessagesQuery,
  useGetChatIdMutation,
} from "../../../services/chat/chat";
import config from "../../../config";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { UserType } from "../../../types/types";

interface Message {
  senderId: string | any;
  recipientId: string;
  content: string;
  sender?: {
    _id: string;
  };
  chatId: string;
}

interface Props {
  navigation: any;
}

const Messages: React.FC<Props> = ({ navigation }) => {
  const route = useRoute();
  const { userName, userBId } = route.params as {
    userBId: string;
    userName: string;
  };
  const [message, setMessage] = useState<string>("");
  const [chatId, setChatId] = useState<string>("");
  const [refreshChatId, setRefreshChatId] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<UserType | null>(null);// Example sender ID

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Get the user string from SecureStore
        const userString = await SecureStore.getItemAsync("user");

        // If userString is not null, parse it into an object
        if (userString) {
          const userData = JSON.parse(userString);
          setCurrentUserId(userData); // Set the user state
        }
      } catch (error) {
        console.log("Error fetching user from SecureStore:", error);
      }
    };

    fetchUser(); // Call the fetchUser function
  }, []);

  const [getChatId] = useGetChatIdMutation();

  const socket: Socket | null = useSocket(config.localURL);

  // Fetch messages using RTK Query
  const { data: messages, refetch } = useFetchMessagesQuery(chatId);

  useEffect(() => {
    const fetchChatId = async () => {
      try {
        // Fetch chatId from API if not in AsyncStorage
        if (userBId && currentUserId) {
          const response = await getChatId({
            userAId: userBId,
            userBId: currentUserId?._id,
          }).unwrap();

          const fetchedChatId = response.chatId;
          setChatId(fetchedChatId);
          console.log("Chat ID fetched from API:", fetchedChatId);

          // Save chatId to AsyncStorage
          await AsyncStorage.setItem(`chatId-${userBId}`, fetchedChatId);
          const storedChatId = await AsyncStorage.getItem(`chatId-${userBId}`);
          if (storedChatId) {
            setChatId(storedChatId);
          }
        }
      } catch (error) {
        console.log("Error fetching chat ID:", error);
      }
    };

    fetchChatId();
    refetch();

    if (socket && currentUserId) {
      socket.on("connect", () => {
        console.log("Socket connected to server for chat:", chatId);
        socket.emit("joinChat", { chatId, userId: currentUserId?._id });
      });

      socket.on("receiveMessage", (message: Message) => {
        refetch(); // Refresh messages when a new one is received
      });

      return () => {
        console.log("Cleaning up socket connection for chat:", chatId);
        socket.off("connect");
        socket.off("receiveMessage");
      };
    } else if (chatId === "") {
      console.log("Waiting for chatId to initialize socket connection.");
    }
    refetch();
  }, [socket, chatId, currentUserId, refetch, refreshChatId]);

  const handleSendMessage = async () => {
    if (message.trim()) {
      const newMessage: Message = {
        senderId: currentUserId?._id,
        recipientId: userBId,
        content: message,
        chatId: chatId,
      };
      // Send message through the socket for real-time communication
      if (socket) {
        socket.emit("sendMessage", newMessage);
      }

      setMessage("");

      setTimeout(() => {
        setRefreshChatId((prev) => !prev); // Toggle the state
      }, 1000); // Delay for 1000 milliseconds (1 second)
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? -10 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={MessagesStyle.container}>
          <View style={MessagesStyle.header}>
            <TouchableOpacity
              onPress={() => navigation.navigate("BottomNavigator")}
            >
              <ArrowLeftIcon />
            </TouchableOpacity>
            <View style={MessagesStyle.profilePic}></View>
            <View style={MessagesStyle.userDetails}>
              <Text
                style={{ fontSize: 16, fontWeight: "600", marginBottom: 3 }}
              >
                {userName === "" ? "Unknown" : userName}
              </Text>
              <Text style={{ color: "grey" }}>Online</Text>
            </View>
          </View>

          <ScrollView
            contentContainerStyle={{ padding: 10 }}
            style={MessagesStyle.messageBoxContainer}
            showsVerticalScrollIndicator={false}
          >
            {messages?.map((message, index) => (
              <View
                key={index}
                style={[
                  MessagesStyle.messageBox,
                  {
                    backgroundColor:
                      message.sender?._id === currentUserId?._id
                        ? "#ccc"
                        : "#08162E",
                    alignSelf:
                      message.sender?._id === currentUserId?._id
                        ? "flex-start"
                        : "flex-end",
                  },
                ]}
              >
                <Text
                  style={{
                    color:
                      message.sender?._id === currentUserId?._id ? "black" : "white",
                  }}
                >
                  {message.content}
                </Text>
              </View>
            ))}
          </ScrollView>

          <View style={MessagesStyle.textInputContainer}>
            <View style={{ position: "relative" }}>
              <TextInput
                style={MessagesStyle.sendMessageInput}
                placeholder="Send Message..."
                value={message}
                onChangeText={setMessage}
              />
              <TouchableOpacity
                style={MessagesStyle.sendArrowIcon}
                onPress={handleSendMessage}
              >
                <SendArrowIcon />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Messages;
