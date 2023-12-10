import { configureStore } from '@reduxjs/toolkit'
import { movieReducer } from '../slices/movieReducer'


export const store = configureStore({
  reducer: {
    movies: movieReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
