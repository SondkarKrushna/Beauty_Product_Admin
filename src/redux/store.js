import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./apis/authApi";
import { categoryApi } from "./apis/categoryApi";
import { productApi } from "./apis/productApi";
import { productDetailsApi } from "./apis/productDetailsApi";
import { customerApi } from "./apis/customerApi";
import { orderApi } from "./apis/orderApi";
import {countApi} from "./apis/countApi";
import {invoiceApi} from "./apis/invoiceApi";
import {contactUsApi} from "./apis/contactUs";
import authReducer from "./apis/authSlice"
import { createSaleApi } from "./apis/createSaleApi";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [productDetailsApi.reducerPath]: productDetailsApi.reducer,
        [customerApi.reducerPath]: customerApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [createSaleApi.reducerPath]: createSaleApi.reducer,
        [countApi.reducerPath]: countApi.reducer,
        [invoiceApi.reducerPath]:invoiceApi.reducer,
        [contactUsApi.reducerPath]:contactUsApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, categoryApi.middleware,
            productApi.middleware, productDetailsApi.middleware, customerApi.middleware, 
            orderApi.middleware, createSaleApi.middleware,countApi.middleware,
        invoiceApi.middleware,contactUsApi.middleware),
});
