import { TResponceRedux } from "../../../types/global";
import { TService } from "../../../types/Service";
import { baseApi } from "../../api/BaseApi";

const AdminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return {
          url: `/services?${queryString}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponceRedux<TService[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),
    getServiceById: builder.query({
      query: (id) => {
        return {
          url: `/services/${id}`,
          method: "GET",
        };
      },
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
        method: "PUT",
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
  useGetServiceByIdQuery
} = AdminApi;
