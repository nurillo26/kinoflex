
import { TicketList } from '../TicketsList/TicketList';
import { FC, useEffect, useState } from 'react';
import styles from './CinemaHallModal.module.css';

import { Seats } from '../Seats/Seats';
import { Skeleton } from '@mui/material';

interface CinemaHallModalProps {
  setModalOpen: any;
  movieDetailsRef: React.RefObject<HTMLDivElement>;
  isModalOpen: boolean;
  selectedTime: string;
  selectedMovie: string | undefined;
  bookedSeats: number[];
  movieId: string | undefined;
  closeModal: () => void;
  isLoadingSeats: boolean;
}

export const CinemaHallModal: FC<CinemaHallModalProps> = ({
    setModalOpen, 
    movieDetailsRef, 
    isModalOpen, 
    selectedTime, 
    selectedMovie, 
    bookedSeats, 
    movieId,
    closeModal,
    isLoadingSeats 
  }) => {

  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [isPurchased, setIsPurchased] = useState<boolean>(false);

  const purchase = () => {
    setIsPurchased(true);

    setTimeout(() => {
      setSelectedSeats([]);
    }, 2000)
    
  }
  

  useEffect(() => {
    const movieDetailsElement = movieDetailsRef.current;
    if (movieDetailsElement) {      
      setModalPosition({
        top: window.scrollY,
        left: window.scrollX,
      });
    }
  }, [movieDetailsRef]);

  useEffect(() => {
    const body = document.body;
  
    if (isModalOpen) {
      body.classList.add('modal-open');
    } else {
      body.classList.remove('modal-open');
    }
  
    return () => {
      body.classList.remove('modal-open');
    };
  }, [isModalOpen]);

  const selectSeatFunc = (seatID: number) => {
     const seatIndex = selectedSeats.indexOf(seatID);

     if (seatIndex !== -1) {
       const updatedSelectedSeats = [...selectedSeats];
       updatedSelectedSeats.splice(seatIndex, 1);
       setSelectedSeats(updatedSelectedSeats);
     } else {
       setSelectedSeats([...selectedSeats, seatID]);
     };
     
     
  }

  return (
    <div className={styles.modal_wrap} style={{ top: modalPosition.top, left: modalPosition.left }}>

      <div className={styles.modal}>
        {/* Закрыть модальное окно */}
        <button 
          className={styles.close_modal_btn}
          onClick={() => {
            closeModal();
            setModalOpen(false)            
          }}
        >
          <img src="/images/cross.png" alt="close" />
        </button>

        {/* Схема зала */}
        <div className={styles.cinema_hall}>
          <div className={styles.screen_block}>
            <i className="icon-screen"></i>
          </div>

          <div className={styles.hall}>
            <div className={styles.hall_row}>
              {Array(9).fill('').map((_, index) => 
                <div
                  key={index} 
                  className={styles.seats_num}
                >
                  {index + 1}
                </div>
              )}
            </div>

            <div className={styles.seats_wrap}>
              {isLoadingSeats ? (
                Array(81).fill('').map((_, index) =>
                  <div 
                    key={index}
                    className={styles.skeleton_wrap}
                  >
                    <Skeleton
                      animation='wave' 
                      sx={{
                        width: 32,
                        height: 32,
                        transform: 'scale(1, 1)'
                      }}
                    />
                  </div>
                )
              ) : (
                Array(81).fill('').map((_, index) => 
                  <Seats 
                    key={index} 
                    seatNum={index + 1}
                    selectSeatFunc={(seatID) => selectSeatFunc(seatID)}
                    booked={bookedSeats}
                    selectedSeats={selectedSeats}
                    isPurchased={isPurchased}
                  />
                )
              )}
            </div>

          </div>

          <div className={styles.seats_info}>
            <div className={styles.info_color}>Свободно</div>
            <div className={styles.info_color}>Занято</div>
            <div className={styles.info_color}>Выбрано</div>
          </div>


        </div>

        {/* Блок с инфой о выбранных билетах */}
        <TicketList
          selectedTime={selectedTime} 
          selectedSeats={selectedSeats}
          selectedMovie={selectedMovie}
          movieId={movieId}
          purchase={purchase}
        />

      </div>
      
    </div>
  )
}
