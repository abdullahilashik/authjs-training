"use client"

import React from 'react'
import { Button, buttonVariants } from '../ui/button';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

interface PageProps {
    url: string;
    label: string;
    active: boolean
}

const PostPagination = ({links} : any) => {
    const onPaginationChanged = (link : PageProps) => {
        const url = new URL(link?.url);
        const page = url.searchParams.get('page') || 1;
        const category = url.searchParams.get('category') || 1;
        const filter = url.searchParams.get('filter') || 1;
        // revalidatePath('/','layout')
        redirect(`/posts?page=${page}&category=${category}&filter=${filter}`)
    }
  return (
    <div className="flex items-center gap-2">
        {
            links && links?.map((link: PageProps, key: number)=> (
                <Button className={
                    twMerge(
                        buttonVariants({variant: link.active ? 'outline' : 'default'}),
                        link.active ? 'text-black' : 'text-white'
                    )
                } key={key} disabled={!link.url} onClick={()=> onPaginationChanged(link)}>
                    <span dangerouslySetInnerHTML={{__html: link.label}}></span>
                </Button>
            ))
        }
    </div>
  )
}

export default PostPagination