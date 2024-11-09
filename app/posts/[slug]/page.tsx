import { fetchSinglePost } from '@/actions/post-action'
import BreadCrumb from '@/components/breadcrumb'
import BookmarkCount from '@/components/posts/bookmark-count'
import DateReadable from '@/components/posts/date-readable'
import FavoriteCount from '@/components/posts/favorite-count'
import PostComment from '@/components/posts/post-comment'
import PostCommentList from '@/components/posts/post-comment-list'
import TinyEditor from '@/components/posts/tiny-editor'
import ViewCount from '@/components/posts/view-count'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import axios from 'axios'
import { FacebookIcon, InstagramIcon, RedoDotIcon, TwitterIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'

const PostIndividualPage = async ({params}) => {
    const slug = await params; 
    console.log('Slug: ', slug.slug);   
    const post = await fetchSinglePost(slug.slug);    
    console.log('Post: ', post);

    
  return (
    <section className='py-12'>
        <div className="container w-full">
            <BreadCrumb />
            {/* product information */}
            <Card className='mt-5'>
                <CardHeader className='flex flex-row items-center gap-2 justify-between'>
                    <div className="flex items-center gap-2">
                        <Image height={40} width={40} src={'https://github.com/shadcn.png'} alt='' className='rounded-full'/>
                        <div className="flex flex-col items-start">
                            <h1>{post.user.fname}{` `}{post.user.lname}</h1>                            
                            <DateReadable dateString={post.created_at} />
                        </div>
                    </div>
                    {/* action buttons */}
                    <div className="flex gap-1 items-center">
                        <ViewCount post={post} />
                        <FavoriteCount post={post} />
                        <BookmarkCount post={post} />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold">{post.title}</h1>
                        <article dangerouslySetInnerHTML={{__html: post.description}}></article>
                    </div>
                </CardContent>
                <CardFooter className='flex items-center justify-between'>
                    <ul className="flex items-center gap-1">
                        {
                            post?.categories?.map((category: string) => (
                                <span key={category} className="text-sm px-2 py-1 rounded bg-gray-200">{category}</span>
                            ))
                        }                        
                    </ul>
                    <ul className="flex items-center gap-2">
                        <Button size={'sm'} variant={'outline'}><FacebookIcon /></Button>
                        <Button size={'sm'} variant={'outline'}><InstagramIcon /></Button>
                        <Button size={'sm'} variant={'outline'}><TwitterIcon /></Button>
                        <Button size={'sm'} variant={'outline'}><RedoDotIcon /></Button>
                    </ul>
                </CardFooter>
            </Card>
            {/* comment list */}
            <PostComment postId={post.id}/>
            <PostCommentList postId={post.id} />
        </div>
    </section>
  )
}

export default PostIndividualPage