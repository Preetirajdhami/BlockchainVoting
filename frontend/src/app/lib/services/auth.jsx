// Importing the necessary functions from Redux Toolkit
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blockchainvoting-z1xf.onrender.com/api/user' }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (userData) => {
        return {
          url: 'register', 
          method: 'POST',   
          body: userData,   // Sending user data in the request body
          // Remove the Content-Type header so the browser can set it automatically
          // headers: {
          //   'Content-type': 'application/json'
          // }
        };
      },
    }),
  }),
});

export const { useCreateUserMutation } = authApi;
