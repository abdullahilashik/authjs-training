import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import Image from 'next/image'
import ViewCount from './view-count';
import FavoriteCount from './favorite-count';
import BookmarkCount from './bookmark-count';
import Link from 'next/link';

interface PostProps {
    id: string;
    title: string;
    slug: string;
    description: string;
    created_at: string;
    user: any,
    categories: any
}

const PostList = ({posts} : any) => {
  return (
    <div className="flex flex-col gap-y-4">
        {
            posts.map(post=> (
                <Card key={post.id}>            
                    <CardContent className='flex items-start flex-col justify-center p-4 gap-y-4'>
                        <div className="flex flex-col items-start">
                            <Link href={`/posts/${post.slug}`}>
                                <h1 className='font-bold text-lg'>{post.title}</h1>
                            </Link>
                            <ul className="flex items-center gap-1 mt-2">
                                {
                                    post?.categories?.map(category=> <span key={category} className="badge px-2 py-1 rounded bg-gray-100 text-[10px]">{category}</span>)
                                }
                            </ul>
                        </div>
                        <div className="flex items-end justify-between w-full">
                            <div className="flex flex-row items-center gap-2">
                                <Image src={'https://github.com/shadcn.png'} height={40} width={40} className='rounded-full' alt="User Avatar"/>
                                <div className="flex flex-col items-start">
                                    <h4>{post?.user?.fname}{` `} {post?.user?.lname}</h4>
                                    <span className="text-sm">{post.created_at}</span>
                                </div>
                            </div>
                            {/* action buttons */}
                            <div className='flex items-center gap-0'>
                                <ViewCount />                    
                                <FavoriteCount />
                                <BookmarkCount />                                
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))
        }
    </div>
  )
}

export default PostList