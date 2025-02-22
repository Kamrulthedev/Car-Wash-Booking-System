/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/BaseApi";
import { setUser } from "./AuthSlice";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {

        try {
          const { data } = await queryFulfilled;
          if (data) {
            const { data: user, token } = data; 
            dispatch(setUser({ user, token })); 
          }
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),
  }),
});
  export const { useLoginMutation }: any = authApi;
  