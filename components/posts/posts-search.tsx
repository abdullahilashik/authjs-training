"use client"
import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Button } from '../ui/button'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

const PostsSearch = ({categories} : {categories : any}) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();
    const handleCategoryChange = (cat) => {
        console.log('Catgory: ', cat);
        const params = new URLSearchParams(searchParams);
        if(cat){
            params.set('query', cat);
        }else{
            params.delete('query');
        }
        console.log('params: ', params);
        console.log('Searchparams: ', searchParams);
        console.log('Pathname: ', pathname);
        replace(`${pathname}?${params.toString()}`);
    }

    const handleSortChange = (val) => {
        const params = new URLSearchParams(searchParams);
        if(val){
            params.set('filter', val);
        }else{
            params.delete('filter');
        }
        console.log('params: ', params);
        console.log('Searchparams: ', searchParams);
        console.log('Pathname: ', pathname);
        replace(`${pathname}?${params.toString()}`);
    };

  return (
    <>
        <form action={'#'} className="inline-flex gap-2 items-center">
              <Select name="category" onValueChange={handleCategoryChange} defaultValue={searchParams.get('query') || ''}>
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>                  
                  {categories.map(category=> <SelectItem value={category.slug} key={category.id}>{category.title}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select name="sort" onValueChange={handleSortChange} defaultValue={searchParams.get('filter') || ''}>
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                </SelectContent>
              </Select>
              <Button type="submit">Search</Button>
            </form>
    </>
  )
}

export default PostsSearch