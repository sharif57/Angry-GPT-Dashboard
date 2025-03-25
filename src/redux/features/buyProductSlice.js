import baseApi from "../api/baseApi";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allBuyProductGet: builder.query({
      query: ({ limit, state }) => {
        let queryParams = new URLSearchParams();
        if (limit) queryParams.append("limit", limit.toString());
        // if (state) queryParams.append("state", state.toString());
        // let query = {};
        if (state) queryParams.append("state", state.toString()); 
        console.log(state,'idjsfdjl');

        return `/admin/buy?${queryParams.toString()}`;
      },
      providesTags: ["Buy"],
    }),

    // productCancle: (builder) => ({
    //   query: (id) => ({
    //     url: `/admin/buy/${id}/cancel`,
    //     method: "PUT",
    //   }),
    //   providesTags: ["Transaction"],
    // }),

    productCancle:builder.mutation({
      query: (id) => ({
        url: `/admin/buy/${id}/cancel`,
        method: "POST",
      }),
      invalidatesTags: ["Buy"],
    }),

    confirmProduct:builder.mutation({
      query: (id) => ({
        url: `/admin/buy/${id}`,
        // /admin/buy/67d008d599c9ab03cac4d181
        method: "POST",
      }),
      invalidatesTags: ["Buy"],
    })
  

  }),
});

export const { useAllBuyProductGetQuery, useProductCancleMutation, useConfirmProductMutation } = transactionApi;
