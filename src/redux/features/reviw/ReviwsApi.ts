import { TResponceRedux } from "../../../types/global";
import { baseApi } from "../../api/BaseApi";

type TReviw = {
  feedback: string;
  rating: string;
} | undefined;

const ReviwsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviws: builder.query({
      query: () => {
        return {
          url: "/reviws",
          method: "GET",
        };
      },
      transformResponse: (response: TResponceRedux<TReviw[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),
    addReviw: builder.mutation({
      query: (ReviwData) => {
        return {
          url: "/create/reviw",
          method: "POST",
          body: ReviwData,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllReviwsQuery, useAddReviwMutation } = ReviwsApi;
