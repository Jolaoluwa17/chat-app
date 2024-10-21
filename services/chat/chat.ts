import { api } from "../api";
import Message from "../../types/types";

export const chatSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    userChat: builder.mutation({
      query: (id) => ({
        url: `chats/usersChats/${id}`,
        method: "GET",
      }),
    }),
    fetchMessages: builder.query<Message[], string>({
      query: (chatId) => `chats/${chatId}`,
    }),
    sendMessage: builder.mutation<void, Message>({
      query: (newMessage) => ({
        url: "sendMessage", // Adjust this endpoint according to your server setup
        method: "POST",
        body: newMessage,
      }),
    }),
    getChatId: builder.mutation({
      query: (userIdData) => ({
        url: "chats/getChat",
        method: "POST",
        body: userIdData,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useUserChatMutation,
  useFetchMessagesQuery,
  useSendMessageMutation,
  useGetChatIdMutation,
} = chatSlice;
