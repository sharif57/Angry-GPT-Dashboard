import baseApi from "../api/baseApi";

export const booksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postBook: builder.mutation({
      query: (blog) => ({
        url: "/admin/books/create",
        method: "POST",
        body: blog,
        formData: true,
      }),
      invalidatesTags: ["Books"],
    }),

    // getAllBooks: builder.query({
    //   query: () => ({
    //     url: "/books",
    //     method: "GET",
    //   }),
    //   providesTags: ["Books"],
    // }),

    getAllBooks: builder.query({
      query: ({ limit }) => {
        let queryParams = new URLSearchParams();
        if (limit) queryParams.append("limit", limit.toString());

        return `/books?${queryParams.toString()}`;
      },
      providesTags: ["Books"],
    }),

    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/admin/books/${id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),

    singleBookDetails: builder.query({
      query: (id) => ({
        url: `/books/${id}`,
        method: "GET",
      }),
      providesTags: ["Books"],
    }),
    updateBook: builder.mutation({
      query: ({ id, book }) => ({
        url: `/admin/books/${id}/edit`,
        method: "PATCH",
        body: book,
        formData: true,
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  usePostBookMutation,
  useGetAllBooksQuery,
  useDeleteBookMutation,
  useSingleBookDetailsQuery,
  useUpdateBookMutation,
} = booksApi;
