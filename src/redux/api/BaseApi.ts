import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { DefaultOptionType } from "antd/es/select";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/AuthSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://car-wash-booking-system-murex.vercel.app/api/",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs | string,
  unknown,
  DefaultOptionType
> = async (args, api, extraOptions) => {
  let result = (await baseQuery(args, api, extraOptions)) as any;

  if (result.error?.status === 401) {
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
        api.dispatch(
          setUser({
            user: (api.getState() as RootState).auth.user,
            token: data.data.accessToken,
          })
        );

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

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});
