import { baseApi } from "../../api/BaseApi";

const PaymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    InitalePayment: builder.mutation({
      query: (data) => {
        return {
          url: "/initiale",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useInitalePaymentMutation } = PaymentApi;
