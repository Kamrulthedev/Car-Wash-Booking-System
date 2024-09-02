import { TResponceRedux } from "../../../types/global";
import { TUser } from "../../../types/User";
import { baseApi } from "../../api/BaseApi";

const UserManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => {
        return {
          url: "/users",
          method: "GET",
        };
      },
      transformResponse: (response: TResponceRedux<TUser[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),
    updateUSer: builder.mutation({
      query: ({ id, ...userData }) => {
        return {
          url: `/user/${id}`,
          method: "PUT",
          body: userData,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetUsersQuery, useUpdateUSerMutation } = UserManagementApi;
