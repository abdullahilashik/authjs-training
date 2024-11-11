import React from 'react'
import {Bookmark, BookmarkCheckIcon, Eye} from 'lucide-react';
import { Button } from '../ui/button';
import { auth } from '@/auth';
import { toggleBookmark } from '@/actions/post-action';
import { revalidate } from './post-reply';
import { revalidatePath } from 'next/cache';

const BookmarkCount = async ({post}) => {
  const session = await auth();
  const bookmark = await fetch('http://localhost:8000/api/posts/bookmark-check/' + post.id, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + session?.user?.token,
      'Accept': 'application/json'
    }
  });
  const isBookmarked = await bookmark.json();  

  return (
    <form action={async()=>{
      "use server";
      await toggleBookmark(post.id, session?.user?.token);
      revalidatePath('/', 'layout');
    }}>
      <Button size={'sm'} variant={'link'} className='flex gap-1'>
        
        {isBookmarked?.success && <BookmarkCheckIcon color='red' />}
        {!isBookmarked?.success && <Bookmark />}
        <span>{post?.bookmark_count || 0}</span>
      </Button>
    </form>
  )
}

export default BookmarkCount