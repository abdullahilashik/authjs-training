import React from 'react'
import { Card, CardContent } from '../ui/card'
import Image from 'next/image'
import ViewCount from './view-count';
import FavoriteCount from './favorite-count';
import BookmarkCount from './bookmark-count';
import Link from 'next/link';
import DateReadable from './date-readable';
import { fetchPosts } from '@/actions/post-action';
import PostPagination from './post-pagination';

interface PostProps {
    id: string;
    title: string;
    slug: string;
    description: string;
    created_at: string;
    user: any,
    categories: any
}

const PostList = async ({query} : {query: any}) => {
    let posts = await fetchPosts(query);
    posts = posts.data;
  return (
    <div className="flex flex-col gap-y-4">
        {
            posts && posts.map((post : PostProps)=> (
                <Card key={post.id}>            
                    <CardContent className='flex items-start flex-col justify-center p-4 gap-y-4'>
                        <div className="flex flex-col items-start">
                            <Link href={`/posts/${post.slug}`}>
                                <h1 className='font-bold text-lg'>{post.title}</h1>
                            </Link>
                            <ul className="flex items-center gap-1 mt-2">
                                {
                                    post?.categories?.map((category : any)=> <span key={category} className="badge px-2 py-1 rounded bg-gray-100 text-[10px]">{category}</span>)
                                }
                            </ul>
                        </div>
                        <div className="flex items-end justify-between w-full">
                            <div className="flex flex-row items-center gap-2">
                                <Image src={'https://github.com/shadcn.png'} height={40} width={40} className='rounded-full' alt="User Avatar"/>
                                <div className="flex flex-col items-start">
                                    <h4>{post?.user?.fname}{` `} {post?.user?.lname}</h4>
                                    <span className="text-sm">{post.created_at}</span>
                                    {/* <DateReadable dateString={post.created_at}/> */}
                                </div>
                            </div>
                            {/* action buttons */}
                            <div className='flex items-center gap-0'>
                                <ViewCount post={post} />                    
                                <FavoriteCount post={post} />
                                <BookmarkCount post={post} />                                
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))
        }

        {posts && <PostPagination links={posts.links} />}
    </div>
  )
}

export default PostList