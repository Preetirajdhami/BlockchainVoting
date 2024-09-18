// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/user' }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (user) => {
        // console.log('Create User Data', user);
        return {
          url: 'register', // specify the correct endpoint here
          method: 'POST', // use POST for creating a user
          body: user, // sending user data in the request body
          headers: {
            'Content-type':'application/json'
          }
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCreateUserMutation } = authApi;
