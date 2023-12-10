import { Actors } from "./Actors";
import { MovieImage } from "./MovieImages";
import { Video } from "./Videos";

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  genre_names: string[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  formattedReleaseDate?: string;
  images: MovieImage[];
  actors: Actors[];
  videos: Video[];
  __v: number;
  _id: string;
}