import Skeleton from '@mui/material/Skeleton';

import styles from './MovieItemSkeleton.module.css';
import { Box } from '@mui/material';

export const MovieItemSkeleton = () => {
  return (
    <div className={styles.movieItemSkeleton}>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', height: '80%' }}>
        <Skeleton 
          width="100%" 
          height='100%' 
          variant="rounded"
          animation='wave'
        />
      </Box>

      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        width: '100%', 
        height: '20%'
       }}>
        <Skeleton width={'80%'} height={40}></Skeleton>
        <Skeleton width={'80%'} height={20}></Skeleton>
      </Box>
    </div>
  )
}
