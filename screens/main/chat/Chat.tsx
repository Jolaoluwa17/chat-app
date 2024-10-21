import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { ChatStyle } from "./chatStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchIcon from "../../../assets/icons/SearchIcon";
import {
  useGetChatIdMutation,
  useUserChatMutation,
} from "../../../services/chat/chat";
import {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
} from "../../../services/user/userSlice";
import { useFocusEffect } from "@react-navigation/native";
import { format, isToday, isYesterday, isThisWeek } from "date-fns";
import * as SecureStore from "expo-secure-store";
import { UserType } from "../../../types/types";

interface Props {
  navigation: any;
}

const Chat: React.FC<Props> = ({ navigation }) => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Get the user string from SecureStore
        const userString = await SecureStore.getItemAsync("user");

        // If userString is not null, parse it into an object
        if (userString) {
          const userData = JSON.parse(userString);
          setUser(userData); // Set the user state
        }
      } catch (error) {
        console.log("Error fetching user from SecureStore:", error);
      }
    };

    fetchUser();
  }, []);

  const [userChats, { error, isLoading }] = useUserChatMutation();
  const [chats, setChats] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      if (user) {
        const fetchChats = async () => {
          try {
            const response = await userChats(user?._id).unwrap();
            setChats(response.users);
          } catch (err) {
            console.log("Error fetching chats:", err);
          }
        };

        fetchChats();
      }

      // Optionally return a cleanup function if necessary
      return () => {
        console.log("Cleanup or unsubscribing actions (if needed).");
      };
    }, [userChats, user])
  );

  const getInitials = (fullName: string | undefined) => {
    if (!fullName) return "NA";

    const nameArray = fullName.trim().split(" ");

    // Only process the first two words for initials
    const initials = nameArray
      .slice(0, 2)
      .map((name) => name.charAt(0).toUpperCase())
      .join("");

    return initials;
  };

  const {
    data: users,
    error: userError,
    isLoading: userLoading,
  } = useGetAllUsersQuery({});

  const [getChatId] = useGetChatIdMutation();

  const handleChatNavigation = async (userBId: string, userName: string) => {
    try {
      const response = await getChatId({
        userAId: user?._id,
        userBId,
      }).unwrap(); // This will unwrap the mutation response

      const { chatId } = response;

      navigation.navigate("Messages", {
        userBId,
        userName,
        chatId, // Pass the fetched chatId here
      });
    } catch (error) {
      console.log("Error fetching chat ID:", error);
      navigation.navigate("Messages", {
        userBId,
        userName,
        chatId: "", // Pass the fetched chatId here
      });
    }
  };

  const formatMessageTime = (createdAt: string): string => {
    const messageDate = new Date(createdAt);
    const today = new Date();

    if (isToday(messageDate)) {
      return format(messageDate, "HH:mm");
    }

    if (isYesterday(messageDate)) {
      return "Yesterday";
    }

    if (isThisWeek(messageDate)) {
      return format(messageDate, "EEEE");
    }

    return format(messageDate, "MMM d, yyyy");
  };

  const {
    data: loggedinUser
  } = useGetUserByIdQuery(user ? user._id : "", { skip: !user });

  return (
    <SafeAreaView style={ChatStyle.container}>
      <View style={ChatStyle.chatTitle}>
        <Text style={ChatStyle.titleName}>{loggedinUser?.name}</Text>
        <SearchIcon />
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={ChatStyle.peopleContainer}
      >
        {!userLoading &&
          users &&
          users
            .filter((u: any) => u._id !== user?._id) // Filter out the logged-in user
            .map((user: any) => (
              <TouchableOpacity
                key={user._id}
                onPress={() => handleChatNavigation(user._id, user.name)}
              >
                <View style={ChatStyle.peopleCircleContainer}>
                  <View style={ChatStyle.peopleCircle}>
                    <Text style={{ color: "white", letterSpacing: 2 }}>
                      {getInitials(user.name)}
                    </Text>
                  </View>
                  <Text style={{ textAlign: "center", marginTop: 5 }}>
                    {user.name === "" ? "Unknown" : user.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
      </ScrollView>
      <Text style={ChatStyle.chatsText}>Chats</Text>
      <ScrollView style={ChatStyle.chatsContainer}>
        {!isLoading &&
          chats.length > 0 &&
          chats.map((chat) => (
            <TouchableOpacity
              key={chat._id}
              style={ChatStyle.chatsBox}
              onPress={() =>
                navigation.navigate("Messages", {
                  userBId: chat._id,
                  userName: chat.name,
                  chatId: chat.chatId,
                })
              }
            >
              <View style={ChatStyle.userInitials}>
                <Text style={{ color: "white", letterSpacing: 2 }}>
                  {getInitials(chat.name)}
                </Text>
              </View>
              <View style={ChatStyle.userDetails}>
                <Text
                  style={{ fontSize: 16, marginBottom: 3, fontWeight: "600" }}
                >
                  {chat.name || "Unknown"}
                </Text>
                <Text numberOfLines={1} ellipsizeMode="tail">
                  {chat.recentMessage?.content}
                </Text>
              </View>
              <View style={ChatStyle.userTiming}>
                <Text style={{ color: "grey", fontSize: 12, marginBottom: 3 }}>
                  {chat.recentMessage?.createdAt &&
                    formatMessageTime(chat.recentMessage.createdAt)}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Chat;
