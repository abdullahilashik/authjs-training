import React from 'react'
import {Heart, HeartCrack} from 'lucide-react';
import { Button } from '../ui/button';

const FavoriteCount = ({post}) => {
  return (
    <Button size={'sm'} variant={'link'} className='flex gap-1'>
        <Heart />
        <span>{post?.favorite_count || 0}</span>
    </Button>
  )
}

export default FavoriteCount