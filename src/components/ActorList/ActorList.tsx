
import { FC } from 'react';
import styles from './ActorList.module.css'

import { ActorProps } from '../../interface/ActorsProps';

import { ActorItem } from '../ActorItem/ActorItem';



export const ActorList: FC<ActorProps> = ({percentage, selectedMovie}) => {
  

  return (
    <div className={styles.actor_list_wrap}>

        <div className={styles.list_block}>
            
          {selectedMovie?.actors.map((actor, i) => 
            <ActorItem
              key={actor.id} 
              percentage={percentage}
              actor={actor}
              index={i} 
            />
          )}
          
          
        </div>





    </div>
  )
}
