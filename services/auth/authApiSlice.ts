import { api } from "../api";

export const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (userData) => ({
        url: "auth/user/signup",
        method: "POST",
        body: userData,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (otpData) => ({
        url: "auth/user/verify-account",
        method: "POST",
        body: otpData,
      }),
    }),
    updateUser: builder.mutation({
      query: (userData) => ({
        url: "auth/user",
        method: "PUT",
        body: userData,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useSignUpMutation,
  useVerifyEmailMutation,
  useUpdateUserMutation,
} = authApiSlice;
