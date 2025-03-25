import baseApi from "../api/baseApi";

export const manageOrderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allManageOrders: builder.query({
      query: ({page,limit}) => {
        const queryParams = new URLSearchParams();
        if(page) queryParams.append('page', page);
        if(limit) queryParams.append('limit', limit);
        return {
          url: `/admin/order?${queryParams.toString()}`,
          method: "GET"
        };
      },
      providesTags: ["Orders"],
    }),


    orderDetails: builder.query({
      query: ({ orderId }) => ({
        url: `/admin/order/${orderId}`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),

    shipOrder: builder.mutation({
      query: (orderId) => ({
        url: `/admin/order/${orderId}/shipped`,
        method: "POST",
      }),
      invalidatesTags: ["Orders"],
    }),

    sendReceipt: builder.mutation({
      query: ({ receipt, orderId }) => ({
        url: "/admin/order/send-receipt",
        method: "POST",
        body: { receipt, orderId },
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useAllManageOrdersQuery,
  useShipOrderMutation,
  useSendReceiptMutation,
  useOrderDetailsQuery,
} = manageOrderApi;
