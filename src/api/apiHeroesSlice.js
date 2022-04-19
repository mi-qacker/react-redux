import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiHeroesSlice = createApi({
	reducerPath: 'heroesApi',
	baseQuery: fetchBaseQuery({
		baseUrl: ' http://localhost:3001',
	}),
	tagTypes: ['Heroes'],
	endpoints: (build) => ({
		getHeroes: build.query({
			query: () => '/heroes',
			providesTags: ['Heroes'],
		}),
		createHero: build.mutation({
			query: (hero) => ({
				url: '/heroes',
				method: 'POST',
				body: hero,
			}),
			invalidatesTags: ['Heroes'],
		}),
		deleteHero: build.mutation({
			query: (heroId) => ({
				url: `/heroes/${heroId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Heroes'],
		}),
	}),
})

export const {
	useGetHeroesQuery,
	useCreateHeroMutation,
	useDeleteHeroMutation,
} = apiHeroesSlice