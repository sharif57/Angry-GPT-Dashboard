import baseApi from "../api/baseApi";

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    subscriptionCreate: builder.mutation({
      query: (data) => ({
        url: "/admin/subscription/create",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
      }),
      invalidatesTags: ["Subscription"],
    }),
  }),
});

export const {
  useSubscriptionCreateMutation
} = subscriptionApi;
