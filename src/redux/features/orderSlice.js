import baseApi from "../api/baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: ({ state, limit, page }) => {
        const params = new URLSearchParams();
        if (state) params.append("state", state);
        if (limit) params.append("limit", limit.toString());
        if (page) params.append("page", page.toString());

        return `/orders?${params.toString()}`;
      },
    }),
  }),
});

export const { useGetAllOrdersQuery } = orderApi;
