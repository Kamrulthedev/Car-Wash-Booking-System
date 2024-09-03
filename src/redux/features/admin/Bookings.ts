import { TBooking } from "../../../types/Bookings";
import { TResponceRedux } from "../../../types/global";
import { baseApi } from "../../api/BaseApi";

const BookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: () => {
        return {
          url: "/bookings",
          method: "GET",
        };
      },
      transformResponse: (response: TResponceRedux<TBooking[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),
    getMyBookings: builder.query({
      query: () => {
        return {
          url: "/my-bookings",
          method: "GET",
        };
      },
      transformResponse: (response: TResponceRedux<TBooking[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),
    getMyPendingBookings: builder.query({
      query: () => {
        return {
          url: "/my-pending-bookings",
          method: "GET",
        };
      },
      transformResponse: (response: TResponceRedux<TBooking[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),
    addBooking: builder.mutation({
      query: (bookingData) => {
        return {
          url: "/create/bookings",
          method: "POST",
          body: bookingData, 
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllBookingsQuery,
  useGetMyBookingsQuery,
  useGetMyPendingBookingsQuery,
  useAddBookingMutation,
} = BookingApi;
