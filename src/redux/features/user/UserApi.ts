import { baseApi } from "../../api/BaseApi";

const UserApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      signUp: builder.mutation({
        query: (data) => ({
          url: "/auth/signup",
          method: "POST",
          body: data,
        }),
      }),
    }),
    overrideExisting: false,
  });
  
  export const { useSignUpMutation } = UserApi;