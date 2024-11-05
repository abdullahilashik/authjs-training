import React from 'react'
import {Heart, HeartCrack} from 'lucide-react';
import { Button } from '../ui/button';

const FavoriteCount = () => {
  return (
    <Button size={'sm'} variant={'link'} className='flex gap-1'>
        <Heart />
        <span>2</span>
    </Button>
  )
}

export default FavoriteCount