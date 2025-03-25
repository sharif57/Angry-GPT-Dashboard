import baseApi from "../api/baseApi";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotification: builder.query({
      query: () => ({
        url: "/admin/notification",
        method: "GET",
      }),
      providesTags: ["Notification"],
    }),
  }),
});

export const {  useGetAllNotificationQuery } = transactionApi;
