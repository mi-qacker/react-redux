import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiFiltersSlice = createApi({
	reducerPath: 'filtersApi',
	baseQuery: fetchBaseQuery({
		baseUrl: ' http://localhost:3001',
	}),
	tagTypes: ['Filters'],
	endpoints: (build) => ({
		getFilters: build.query({
			query: () => '/filters',
			providesTags: ['Filters'],
		}),
	}),
})

export const { useGetFiltersQuery } = apiFiltersSlice