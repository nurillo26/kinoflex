
import styles from './ActorItem.module.css'

import { ActorProps } from '../../interface/ActorsProps';
import { FC } from 'react';


export const ActorItem: FC<ActorProps> = ({percentage, actor, index = 0}) => {  
  const isMobile = window.innerWidth <= 600;

  return (
    <div 
      className={styles.actor_item_wrap}
      style={{
        [index % 2 === 1 ? 'right' : 'left']:  isMobile ? 0 : `${(percentage - 1) * 50}%`,
        transform: `translateX(-${percentage >= 0.8 ? 0 : (percentage - 1) * 50}%)`
      }}
    >
      <div className={styles.actor_info}>
        <div className={styles.actor_block}>
          <div className={styles.actor_img}>
            <img src={`https://image.tmdb.org/t/p/w500/${actor?.profile_path}`} alt="Actor" />
          </div>

          <div className={styles.actor_name}>
            <p className={styles.real_actor_name}> {actor?.original_name} </p>
            <p className={styles.character_name}> {actor?.character} </p>
          </div>
        </div>
      </div>
 
    </div>

    

    
  )
}
