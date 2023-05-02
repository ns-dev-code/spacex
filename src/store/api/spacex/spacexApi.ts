import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const spacexApi = createApi({
  reducerPath: 'spacexApi',
  refetchOnFocus: true,
  keepUnusedDataFor: 90,
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: async (headers) => {
      return headers;
    },
  }),
  endpoints: (builder) => ({}),
});

export type SpaceXApiType = typeof createApi;
