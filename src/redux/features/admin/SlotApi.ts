import { TResponceRedux } from "../../../types/global";
import { baseApi } from "../../api/BaseApi";


const AdminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: () => {
        return {
          url: `/services/slots`,
          method: "GET",
        };
      },
      transformResponse: (response : TResponceRedux<TService[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    addService: builder.mutation({
      query: (data) => ({
        url: "/services",
        method: "POST",
        body: data,
      }),
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/services/${id}`,
        method: "DELETE",
      }),
    }),
    updateService: builder.mutation({
      query: ({ id, ...service }) => ({
        url: `/services/${id}`,
        method: 'PUT',
        body: service,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetServicesQuery,
  useAddServiceMutation,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} = AdminApi;
