import baseApi from "../api/baseApi";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // allProductGet: builder.query({
    // query: () => ({
    //     url: "/products",
    //     method: "GET",
    //   }),
    //   providesTags: ["Products"],
    // }),

    allProductGet: builder.query({
      query: ({ limit }) => {
        let queryParams = new URLSearchParams();

        if (limit) queryParams.append("limit", limit.toString());

        return `products?${queryParams.toString()}`;
      },
      providesTags: ["Products"],
    }),
    // /admin/product/679b4adf5ba9ae72b0243019/delete
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/admin/product/${id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    addProduct: builder.mutation({
      query: ({ product, ref_product }) => ({
        url: ref_product
          ? `/admin/product/${ref_product}/variant/create`
          : "/admin/product/create",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),

    // /admin/product/679b4adf5ba9ae72b0243019/edit
    // editProduct: builder.mutation({
    //   query: (id) => ({
    //     url: `/admin/product/${id}/edit`,
    //     method: "PATCH",
    //     // body: product,
    //     formData:true,
    //   }),
    //   invalidatesTags: ["Products"],
    // }),

    editProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/admin/product/${id}/edit`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Products"],
    }),

    singleProductGet: builder.query({
      query: ({ slug }) => ({
        url: `/products/${slug}`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/appointment/update-appointment/${id}/edit`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useAllProductGetQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useSingleProductGetQuery,
  useEditProductMutation,
} = productsApi;
