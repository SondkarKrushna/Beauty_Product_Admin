import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactUsApi = createApi({
    reducerPath: "contactUsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        credentials: "include"
    }),
    tagTypes: ["Customer"],
    endpoints: (builder) => ({
        contactUs: builder.query({
            query: () => `get/contact/us`,
            providesTags: ["Contact"],
        }),
    }),
});

export const {useContactUsQuery} = contactUsApi;
