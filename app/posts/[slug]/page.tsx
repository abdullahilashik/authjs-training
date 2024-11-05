import BreadCrumb from '@/components/breadcrumb'
import BookmarkCount from '@/components/posts/bookmark-count'
import FavoriteCount from '@/components/posts/favorite-count'
import ViewCount from '@/components/posts/view-count'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

const PostIndividualPage = () => {
  return (
    <section className='py-12'>
        <div className="container">
            <BreadCrumb />
            {/* product information */}
            <Card className='mt-5'>
                <CardHeader className='flex flex-row items-center gap-2 justify-between'>
                    <div className="flex items-center gap-2">
                        <Image height={40} width={40} src={'https://github.com/shadcn.png'} alt='' className='rounded-full'/>
                        <div className="flex flex-col items-start">
                            <h1>Oxcel user</h1>                            
                            <span>creted tme</span>
                        </div>
                    </div>
                    {/* action buttons */}
                    <div className="flex gap-1 items-center">
                        <ViewCount />
                        <FavoriteCount />
                        <BookmarkCount />
                    </div>
                </CardHeader>
                <CardContent>
                    some random content to be displayed
                </CardContent>
            </Card>
        </div>
    </section>
  )
}

export default PostIndividualPage