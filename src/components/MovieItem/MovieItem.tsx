import styles from './MovieItem.module.css';
import { NavLink } from 'react-router-dom';
import { Movie } from '../../interface/Movie';
import { FC } from 'react';

interface MovieItemProps {
  movieItemData: Movie;
}

export const MovieItem: FC<MovieItemProps> = ({movieItemData}) => {
  function getRatingColorClass(rating:number) {
    if (rating > 8) {
      return styles.greenRating;
    } else if (rating >= 6) {
      return styles.orangeRating;
    } else {
      return styles.redRating;
    }
  }
  

  return (
    <NavLink 
      to={`movie/${movieItemData.id}`}
      className={styles.movieItem}
    >
      <div className={styles.posterWrap}>
        <img 
          className={styles.moviePosterImg} 
          src={`https://image.tmdb.org/t/p/w500/${movieItemData.poster_path}`} 
          alt={movieItemData.title} 
        />
      </div>
      <div className={styles.titleBlock}>
          <span className={styles.title}>
            {movieItemData.title}
          </span>
          <span className={styles.genres}>
            {movieItemData.genre_names.join(', ')}
          </span>
      </div>

      <div className={`${styles.movieRating} ${getRatingColorClass(movieItemData.vote_average)}`}>
        {movieItemData.vote_average.toFixed(1)}
      </div>
    </NavLink>
  )
}
