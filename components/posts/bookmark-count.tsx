import React from 'react'
import {Bookmark, Eye} from 'lucide-react';
import { Button } from '../ui/button';

const BookmarkCount = () => {
  return (
    <Button size={'sm'} variant={'link'} className='flex gap-1'>
        <Bookmark />
        <span>2</span>
    </Button>
  )
}

export default BookmarkCount