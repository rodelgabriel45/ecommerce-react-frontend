import { User } from '@/types/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type LoginRequest = {
  email: string;
  password: string;
};

type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  endpoints: (builder) => ({
    login: builder.mutation<User, LoginRequest>({
      query: (loginData) => ({
        url: '/auth/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: loginData,
      }),
    }),

    register: builder.mutation<User, RegisterRequest>({
      query: (credentials) => ({
        url: '/auth/signup',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: credentials,
      }),
    }),

    getAuthUser: builder.query<User, void>({
      query: () => ({
        url: '/auth/me',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useGetAuthUserQuery, useRegisterMutation } =
  authApi;
