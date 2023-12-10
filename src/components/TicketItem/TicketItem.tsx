
import { FC } from 'react';
import styles from './TicketItem.module.css'
import { useSelector } from 'react-redux';
import { selectTicketPrice } from '../../slices/movieReducer';

interface TicketItemProps {
  seatNumber: number;
  selectedMovie: string | undefined;
  selectedTime: string;
}

export const TicketItem:FC<TicketItemProps> = ({seatNumber, selectedMovie, selectedTime}) => {
  const ticketPrice = useSelector(selectTicketPrice);

  return (
    <div className={styles.ticket_item}>
      <div className={styles.ticket_info}>
        <div>Время: {selectedTime}</div>
        <div>Ряд: {Math.ceil(seatNumber / 9)}</div>
        <div>Место: {seatNumber}</div>
      </div>

      <div className={styles.ticket_movie_name}>
        Название фильма {selectedMovie}
      </div>

      <div className={styles.standard_control}>
        <span>Цена {ticketPrice}</span>
      </div>
    </div>
  )
}
