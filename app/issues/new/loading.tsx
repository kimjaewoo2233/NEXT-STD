import Skeleton from '@/app/components/Skeleton';
import { Box } from '@radix-ui/themes';
import React from 'react';


export const LoadingNewIssuePage = () => {
  return (
    <Box className='max-w-xl'>
      <Skeleton/>
      <Skeleton height={"20rem"}/>
    </Box>
  )
}

export default LoadingNewIssuePage;

