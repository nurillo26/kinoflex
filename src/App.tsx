import { useEffect } from 'react';
import styles from './App.module.css';
import { Header } from './components/Header/Header';
import { MoviesList } from './components/MoviesList/MoviesList';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addMoviesData } from './slices/movieReducer';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('https://kinoflex-3b178103f73d.herokuapp.com/')
      .then(response => {
        const movies = response.data;
        dispatch(addMoviesData(movies));
      })
  }, [])

  return (
    <div className={styles.app_wrap}>
      <Header />
      <MoviesList />
      
    </div>
  )
}
