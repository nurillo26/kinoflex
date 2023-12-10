
import { FC, useEffect, useState } from 'react'
import styles from './Seats.module.css'

interface SeatsProps {
  seatNum: number;
  selectSeatFunc: (seatID:number) => void;
  booked: number[];
  selectedSeats: number[];
  isPurchased: boolean;
}


export const Seats:FC<SeatsProps> = ({seatNum, selectSeatFunc, booked, selectedSeats, isPurchased}) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [isBuying, setIsBuying] = useState<boolean>(false);
  
  const isBooked = booked.includes(seatNum);

  useEffect(() => {
    setIsBuying(selectedSeats.includes(seatNum));
    
  }, [isPurchased])
  

  const handleSeatClick = () => {
    setIsSelected(!isSelected);
    selectSeatFunc(seatNum);   
  };



  return (
    <div className={styles.seat_icon_wrap}>
      <i 
        className={`icon-seat ${isBooked ? styles.booked_seat : ''} ${isBuying ? styles.buying_seat : ''} ${isSelected && !isBuying ? styles.selected_seat : ''}`}
        onClick={handleSeatClick}
      >
        <span className={styles.seat_num}>{seatNum}</span>
      </i>
    </div>
  )
}
