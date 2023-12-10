import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'
import { Movie } from '../interface/Movie';

interface MovieState {
  movies: Movie[];
  times: string[];
  paralaxImg: string[];
  ticketPrice: number;
}

const initialState: MovieState = {
  movies: [],
  times: ['10:00', '13:00', '18:00', '22:00'],
  paralaxImg: ['/images/paralax-bg/1.png', '/images/paralax-bg/cinema-movie-theater.jpg', '/images/paralax-bg/3.jpg', '/images/paralax-bg/5.jpg', '/images/paralax-bg/4.jpg', '/images/paralax-bg/seassions.jpg'],
  ticketPrice: 1500,
} 

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMoviesData: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
    }
  },
})

export const { addMoviesData } = movieSlice.actions

export const selectMovies = (state: RootState) => state.movies.movies;
export const selectTime = (state: RootState) => state.movies.times;
export const selectParalaxImgs = (state: RootState) => state.movies.paralaxImg;
export const selectTicketPrice = (state: RootState) => state.movies.ticketPrice;

export const movieReducer =  movieSlice.reducer