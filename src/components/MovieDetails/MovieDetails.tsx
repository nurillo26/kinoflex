import styles from './MovieDetails.module.css';
import { Movie } from '../../interface/Movie';

import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

import { format, parse } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useSelector } from 'react-redux';
import { selectTime } from '../../slices/movieReducer';
import { selectParalaxImgs } from '../../slices/movieReducer';

import { Parallax, Background } from "react-parallax";
import Skeleton from '@mui/material/Skeleton';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';

import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import './btn.css'

import { ActorList } from '../ActorList/ActorList';
import { CinemaHallModal } from '../CinemaHallModal/CinemaHallModal';


export const MovieDetails = () => {
  const {movieId} = useParams();
  const [selectedMovie, setSelectedMovie] = useState<Movie>();
  const paralaxImgs = useSelector(selectParalaxImgs);
  const times = useSelector(selectTime);
  const [isModalOpen, setModalOpen] = useState(false);
  const movieDetailsRef = useRef(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookedSeats, setBookedSeats] = useState<number[]>([]);
  const [isLoadingSeats, setIsLoadingSeats] = useState<boolean>(true);
  

  useEffect(() => {
    axios.get(`https://kinoflex-3b178103f73d.herokuapp.com/movie/${movieId}`)
      .then((responce) => {
        const movieData = responce.data;        

          // Преобразование даты
          if (movieData?.release_date) {
            const parsedDate = parse(movieData?.release_date, 'yyyy-MM-dd', new Date());
            const formattedDate = format(parsedDate, 'd MMMM yyyy', { locale: ru });
            setSelectedMovie({
              ...movieData,
              formattedReleaseDate: formattedDate,
            });
          } else {
            setSelectedMovie(movieData);
          }
      })
  }, []);

  
  const getBookedSeats = async (selectedSessionTime: string, movieID: string | undefined) => {
    try {
      const response = await axios.post(
        `https://kinoflex-3b178103f73d.herokuapp.com/session`, {
          time: selectedSessionTime,
          movieID
        });

        setBookedSeats(response.data.bookedSeats);
        setIsLoadingSeats(false);
    } 
    catch (error) {
      console.log(error);
      setIsLoadingSeats(false);
    }
  };


  const closeModal = () => {
    setBookedSeats([]);
    setIsLoadingSeats(true);
  }

  return (
    <div 
      className={styles.movieDetailsWrap}
      ref={movieDetailsRef}
    >

      {/* Header */}
      <div className={styles.detailsHeader}>
        <div className={styles.movieNameWrap}>
          <span>{selectedMovie?.title || <Skeleton width={200} height={20} />}</span>
          <span className={styles.genres}>
            {selectedMovie?.genre_names.join(', ') || <Skeleton width={200} height={18} />}
          </span>
        </div>
        
        <div className={styles.moviePremier}>
          <span>Премьера:</span> <span style={{fontWeight: 'bold'}}>{selectedMovie?.formattedReleaseDate || <Skeleton width={120} height={20}/>}</span>
        </div>
      </div>
      
      {/* About block */}
      <Parallax strength={600}>
        <div className={styles.paralax_contetn_wrap}>
            <div className={styles.about_movie}>
                <div className={styles.poster}>
                  {selectedMovie?.poster_path ? 
                    (<img src={`https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}`} alt="poster" />):
                    (<Skeleton 
                      sx={{ 
                        width: '100%', 
                        height: '100%',
                        transform: 'scale(1, 1)',
                        borderRadius: '20px'
                      }} 
                    />)
                  }
                </div>

                <div className={styles.description_slider_wrap}>
                  <div className={styles.description}>
                    <span style={{fontWeight: 'bold'}}>О фильме:</span>
                    {selectedMovie?.overview ? (
                      <span>{selectedMovie?.overview}</span>
                    ) : (
                      <span>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                      </span>
                    )}
                  </div>

                  {selectedMovie?.images ? (
                    <Swiper 
                      style={{width: '100%', height: 300 }}
                      // loop={true}
                      grabCursor={true}
                      effect={'creative'}
                      creativeEffect={{
                        prev: {
                          shadow: true,
                          translate: ['-120%', 0, -500],
                        },
                        next: {
                          shadow: true,
                          translate: ['120%', 0, -500],
                        },
                      }}
                      autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                      }}
                      pagination={{
                        clickable: true,
                      }}
                      modules={[EffectCreative, Autoplay, Pagination]}
                    >
                      {selectedMovie?.images.map(imgItem => 
                        <SwiperSlide
                          key={imgItem._id}
                          style={{width: '100%', height: 250}}
                        >
                          <img 
                            className={styles.swiper_img}
                            src={`https://image.tmdb.org/t/p/w500/${imgItem.file_path}`} 
                            alt="" 
                          />
                        </SwiperSlide>  
                      )}
                    </Swiper>
                  ) : (
                    <Skeleton 
                      sx={{
                        width: '100%',
                        height: 250,
                        transform: 'scale(1,1)'
                      }}
                    />
                  )}
                </div>
            </div>
        </div>
      </Parallax>

      {/* film trailer */}
      <Parallax 
        strength={600}
        renderLayer={(percentage) => {
          const maxScale = 1;
          const scale = percentage > 1 ? maxScale : percentage;

          return (
            <div className={styles.trailer_wrap}>
                <iframe
                  className={styles.trailer_frame} 
                  src={`https://www.youtube.com/embed/${selectedMovie?.videos[0].key}`}
                  style={{
                    transform: `scale(${scale}, ${scale})`,
                    opacity: percentage,
                    border: 'none',
                    borderRadius: 4,
                    width: '100%',
                    height: '100%',
                  }} 
                />
            </div>
          )

        }} 
      >
        <Background>
          <img style={{width: '140vw', height: '100vh'}} src={paralaxImgs[1]} alt="" />
        </Background>
        <div className={styles.paralax_contetn_wrap} />
      </Parallax>

      {/* Actors */}
      <Parallax
        strength={600}
        renderLayer={(percentage) => 
          <ActorList percentage={percentage} selectedMovie={selectedMovie} />
        }
      >
        <Background>
          {/* <img style={{width: '100vw', height: '100vh' }} src={paralaxImgs[2]} alt="" /> */}
        </Background>
        <div className={styles.paralax_contetn_wrap} />
      </Parallax>

      {/* Выбор сеанса */}
      <Parallax
        strength={100}
      >
        <Background>
          <img 
            src={paralaxImgs[5]} 
            style={{
              width: '100vw', 
              height: '100vh',
            }} 
            alt="slider" 
          />
        </Background>
        <div className={styles.sessions_wrap}>
            <h1>Сеансы:</h1>
            <div className={styles.times_block}>
              {times.map((timeSession, index) => 
                <AwesomeButton
                  key={index} 
                  type='primary'
                  onPress={() => {
                    setModalOpen(true)
                    setSelectedTime(timeSession)
                    getBookedSeats(timeSession, movieId)
                  }}
                >
                  {timeSession}
                </AwesomeButton>
              )}
            </div>
        </div>
      </Parallax>

      {isModalOpen && 
        <CinemaHallModal 
          movieDetailsRef={movieDetailsRef} 
          setModalOpen={setModalOpen}
          isModalOpen={isModalOpen}
          selectedTime={selectedTime}
          selectedMovie={selectedMovie?.title}
          bookedSeats={bookedSeats}
          movieId={movieId}
          closeModal={closeModal}
          isLoadingSeats={isLoadingSeats} 
      />}
    </div>
  )
}
