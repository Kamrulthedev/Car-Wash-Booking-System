import { baseApi } from "../../api/BaseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      login: builder.mutation({
        query: (userInfo) => ({
          url: "/auth/login",
          method: "POST",
          body: userInfo,
        }),
      }),
    }),
  });
  
  export const { useLoginMutation }: any = authApi;
  