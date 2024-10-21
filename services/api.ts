import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import config from "../config";
import { refreshTokenRequest } from "./auth/refresh";
import { logout } from "./auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: config.localURL,
  credentials: "include",
  prepareHeaders: (headers) => {
    return headers;
  },
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // Send a request to your server to refresh the tokens using the refresh token
    const refreshResult = await refreshTokenRequest();

    if (refreshResult && refreshResult.accessToken) {
      // Retry the original query with the new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Handle token refresh failure
      await logout();
    }
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
