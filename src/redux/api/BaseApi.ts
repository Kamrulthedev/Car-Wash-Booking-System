import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { DefaultOptionType } from "antd/es/select";
import { toast } from "sonner";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/AuthSlice";

// Base query setup with token handling
const baseQuery = fetchBaseQuery({
  baseUrl: "https://car-wash-booking-system-murex.vercel.app/api/",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

// Extended base query to handle token refresh
const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs | string,
  unknown,
  DefaultOptionType
> = async (args, api, extraOptions) => {
  let result = (await baseQuery(args, api, extraOptions)) as any;

  if (result.error?.status === 404) {
    toast.error(result.error.data.message);
  }

  if (result.error?.status === 401) {
    // Sending Refresh Token
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh-token",
        method: "POST",
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const data = refreshResult.data as any;
      if (data?.data?.accessToken) {
        const user = (api.getState() as RootState).auth.user;
        api.dispatch(
          setUser({
            user,
            token: data.data.accessToken,
          })
        );

        // Retry the original request with the new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

// Define the base API with the custom base query
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});
