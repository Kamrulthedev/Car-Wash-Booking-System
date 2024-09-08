import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { DefaultOptionType } from "antd/es/select";
import { RootState } from "../store";
import { logout } from "../features/auth/AuthSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://car-wash-booking-system-server-xi.vercel.app/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Define the custom base query function with error handling
const baseQueryWithAuthHandling: BaseQueryFn<
  string | FetchArgs, 
  unknown, 
  DefaultOptionType 
> = async (args, api, extraOptions) => {
  const result = (await baseQuery(args, api, extraOptions)) as any;
  if (result.error?.status === 401) {
    api.dispatch(logout());
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithAuthHandling,
  endpoints: () => ({}), 
});
