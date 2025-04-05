import baseApi from "../api/baseApi";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/profile/edit",
        method: "PATCH",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["User"],
    }),

    userProfile: builder.query({
      query: () => ({
        url: '/me',
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    userList: builder.query({
      query: () => ({
        url: "/admin/users",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useUpdateProfileMutation, useUserListQuery, useUserProfileQuery } = transactionApi;
