import React from 'react'
import {Heart, HeartCrack} from 'lucide-react';
import { Button } from '../ui/button';
import { auth } from '@/auth';
import { increaseView, toggleFavorite } from '@/actions/post-action';
import { revalidatePath } from 'next/cache';
import { HeartFilledIcon } from '@radix-ui/react-icons';

const FavoriteCount = async ({post} : {post: any}) => {
  const session = await auth();
  const isFavorite = await fetch('http://localhost:8000/api/posts/favorite-check/' + post.id, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + session?.user?.token,
      'Accept': 'application/json'
    }
  });
  const favorite = await isFavorite.json();  
  return (

    <form action={async ()=>{
      "use server";
      await toggleFavorite(post.id, session?.user?.token);
      revalidatePath('/','layout');
    }}>
      <Button type='submit' size={'sm'} variant={'link'} className='flex gap-1'>
          {favorite?.success && <HeartFilledIcon fill='red' color='red' />}
          {!favorite?.success && <Heart />}
          <span>{post?.favorite_count || 0}</span>
      </Button>
    </form>
  )
}

export default FavoriteCount