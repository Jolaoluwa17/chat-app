import { api } from "../api";

export const userSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation({
      query: (userData) => ({
        url: `/user/${userData.id}`,
        method: "PUT",
        body: userData,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} = userSlice;
