import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TypeProductItem } from './types';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://64b7989221b9aa6eb0789204.mockapi.io'}),
  endpoints: (build) => ({
    fetchAllProducts: build.query<TypeProductItem[], string>({
      query: (arg) => ({
        url: `/items${arg}`,
      })
    }),
    getOneProduct: build.query<TypeProductItem, string>({
      query: (id) => ({
        url: `/items/${id}`,
      })
    })
  })
})
