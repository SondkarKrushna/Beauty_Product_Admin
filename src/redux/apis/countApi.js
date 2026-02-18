import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const countApi = createApi({
    reducerPath: "countApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        credentials: "include"
    }),
    tagTypes: ["Customer"],
    endpoints: (builder) => ({
        getCount: builder.query({
            query: () => 'count',
            providesTags: ["Count"],
        }),

      
    }),
});

export const {useGetCountQuery} = countApi;
