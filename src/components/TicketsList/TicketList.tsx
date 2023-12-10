import { FC, useEffect, useState } from 'react'
import styles from './TicketList.module.css'
import { TicketItem } from '../TicketItem/TicketItem';

import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { AwesomeButtonProgress } from 'react-awesome-button';
import './buy_btn.css';
import axios from 'axios';

interface TicketListProps {
  selectedSeats: number[];
  selectedTime: string;
  selectedMovie: string | undefined;
  movieId: string | undefined;
  purchase: () => void;
}

declare module 'react-awesome-button' {
  interface ButtonProgressType {
    onPress?: () => void;
  }
}

export const TicketList:FC<TicketListProps> = ({selectedSeats, selectedMovie, selectedTime, movieId, purchase}) => {
  const [cardNumber, setCardNumber] = useState<string>('');
  const [phoneNum, setPhoneNume] = useState<string>('');

  const handleCardNumberChange = (e: any) => {
    const inputNumber = e.target.value.replace(/\s/g, '');
    const formattedNumber = inputNumber.replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(formattedNumber);
  };

  const buyTickets = async () => {
    try {
     await axios.post(`https://kinoflex-3b178103f73d.herokuapp.com/buy-tickets`, {
        selectedSeats,
        selectedTime,
        movieId
      });
    }
    catch(error) {
      console.log(error);
      
    }
  }

  const handleButtonClick = (element: React.MouseEvent<Element, MouseEvent>, next: () => void) => {  
    buyTickets();
    console.log(element);
    

    try {
      axios.post('https://kinoflex-3b178103f73d.herokuapp.com/send-sms', {
        selectedTime,
        selectedSeats,
        phoneNum,
      })
    }
    catch(error) {
      console.log(error);
    } 

    setTimeout(() => {
      next();
      purchase() 
    }, 2000);
  }

  useEffect(() => {
    console.log(selectedSeats);
    
  }, [selectedSeats])

  return (
    <div className={styles.ticket_info_block}>
      <div className={styles.tickets_list_block}>
        <h4>Список билетов:</h4>
        <div className={styles.tickets_list}>
          {selectedSeats.length === 0 ? (<span className={styles.ticket_empty}>Выберите места</span>) : (
            selectedSeats.map((seatNumber, index) => 
              <TicketItem 
                key={index}
                seatNumber={seatNumber}
                selectedMovie={selectedMovie} 
                selectedTime={selectedTime}
              />)
          )}
        </div>

        <div className={styles.user_info}>
          <div className={`${styles.total_price} ${selectedSeats.length > 0 && styles.total_price_show }`}>
            Итого:  
            <span style={{fontWeight: 'bold'}}>
              {selectedSeats.length * 1500}
            </span>
          </div>

          <div className={styles.user_phone}>
            <label className={styles.phone}>Телефон:
              <PhoneInput
                inputStyle={{width: 140}}
                defaultCountry="kz"
                hideDropdown={true}
                value={phoneNum}
                onChange={(e) => setPhoneNume(e)}
              />
            </label>

          </div>

          <div className={styles.user_bank_card}>
            <label className={styles.card}>
              Номер карты:
              <input 
                className={styles.bank_card_input}
                placeholder='Номер карты'
                maxLength={19}
                value={cardNumber}
                onChange={(e) => handleCardNumberChange(e)}
              />
            </label> 
          </div>

          <div className={styles.buy_ticket_btn}>            
            <AwesomeButtonProgress 
              type='primary'
              loadingLabel='Секунду...'
              resultLabel='Успешно!'
              onPress={handleButtonClick}
              style={{
                pointerEvents: selectedSeats.length === 0 || phoneNum.length === 0 || cardNumber.length < 19 ? 'none' : 'auto',
                opacity: selectedSeats.length === 0 || phoneNum.length === 0 || cardNumber.length < 19 ? 0.5 : 1,
              }}
            >
              Купить
            </AwesomeButtonProgress>


          </div>

        </div>
      </div>
    </div>
  )
}

