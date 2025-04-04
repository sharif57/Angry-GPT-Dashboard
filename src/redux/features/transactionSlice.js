import baseApi from "../api/baseApi";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allTransactionGet: builder.query({
      query: () => ({
        url: "/admin/transactions",
        method: "GET",
      }),
      providesTags: ["Transaction"],
    }),
  }),
});

export const { useAllTransactionGetQuery } = transactionApi;
