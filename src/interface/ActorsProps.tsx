import { Actors } from "./Actors";
import { Movie } from "./Movie";

export interface ActorProps {
  percentage: number;
  selectedMovie?: Movie;
  actor?: Actors;
  index?: number;
}