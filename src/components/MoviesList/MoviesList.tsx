import { useSelector } from 'react-redux';
import { MovieItem } from '../MovieItem/MovieItem';
import styles from './MoviesList.module.css';
import { selectMovies } from '../../slices/movieReducer';
import { MovieItemSkeleton } from '../Skeletons/MovieItemSkeleton/MovieItemSkeleton';

export const MoviesList = () => {
  const movies = useSelector(selectMovies);
  
  return (
    <div className={styles.movieListWrap}>
      {!movies || movies.length === 0 ? (
        Array(20).fill('').map((_, index) =>
          <MovieItemSkeleton key={index} />
        )
      ) : (
        movies.map((movieItemData) => 
          <MovieItem movieItemData={movieItemData} key={movieItemData.id}/>
        )
      )}
      
    </div>
  )
}
