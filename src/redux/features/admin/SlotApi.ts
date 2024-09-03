import { TResponceRedux } from "../../../types/global";
import { TSlot } from "../../../types/Slot";
import { baseApi } from "../../api/BaseApi";

const SlotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSlots: builder.query({
      query: () => {
        return {
          url: "/slots/all",
          method: "GET",
        };
      },
      transformResponse: (response: TResponceRedux<TSlot[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),
    getSlotAvailability: builder.query({
      query: () => {
        return {
          url: "/slots/availability",
          method: "GET",
        };
      },
      transformResponse: (response: TResponceRedux<TSlot[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),
    getSlotsByServiceId: builder.query({
      query: (serviceId) => {
        return {
          url: `/slots/service-slots-available?serviceId=${serviceId}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponceRedux<TSlot[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),
    addSlot: builder.mutation({
      query: (data) => ({
        url: `/services/slots`,
        method: "POST",
        body: data,
      }),
    }),
    updateSlot: builder.mutation({
      query: ({ id, ...slotData }) => {
        return {
          url: `/slots/${id}`,
          method: "PUT",
          body: slotData,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddSlotMutation,
  useGetSlotsQuery,
  useUpdateSlotMutation,
  useGetSlotAvailabilityQuery,
  useGetSlotsByServiceIdQuery
} = SlotApi;
