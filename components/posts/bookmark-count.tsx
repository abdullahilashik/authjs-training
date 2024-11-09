import React from 'react'
import {Bookmark, Eye} from 'lucide-react';
import { Button } from '../ui/button';

const BookmarkCount = ({post}) => {
  return (
    <Button size={'sm'} variant={'link'} className='flex gap-1'>
        <Bookmark />
        <span>{post?.bookmark_count || 0}</span>
    </Button>
  )
}

export default BookmarkCount