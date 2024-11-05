"use client";

import React, { useEffect, useState } from 'react'
import {LucideLoader, Search} from 'lucide-react';
import { fetchPostCategoryList } from '@/actions/category-action';
import { handleAutocomplete } from '@/actions/auto-complete';
import { Card, CardContent } from '../ui/card';
import axios from 'axios';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { redirect } from 'next/navigation';

const Header = () => {
    const [keyword, setKeyword] = useState<string>('');
    const [filter, setFilter] = useState<string>('');
    const [results, setResults] = useState<string | boolean | undefined | any>([]);
    const [searchError, setSearchError] = useState(null);
    const [categories, setCategories] = useState('');

    React.useEffect(()=>{        
        fetchPostCategoryList()
            .then(response=> {
                setCategories(response);
            })
    }, []);

    const onHandleSubmit = (values) => {
        console.log('Auto Search: ', values);
    };

    const onKeywordUpdate = (event) => {
        event.preventDefault();
        setKeyword(event.target.value);
        // console.log(event.target.value);
    }

    useEffect(()=> {
        const timer  = setTimeout(()=>{
            if(keyword || filter){
                fetchData();
            }
        }, 1000);

        return (()=> clearTimeout(timer));
    }, [keyword, filter]);

    const fetchData = async() => {
        try{
            const response = await axios.post('http://localhost:8000/api/posts/search', {query:keyword, filter}, {
                headers: {
                    'Accept': 'application.json'
                }
            });
    
            console.log('Search Results: ', response.data);
            setResults(response.data);
        }catch(error){
            console.log("Failed to load data");
            setSearchError('Failed to load data');
        }
    }

    const onListItemClick = (slug : string) => {
        setKeyword('');
        setFilter('');
        setResults('');
        redirect('/posts/' + slug);
    }
    
  return (
    <section className='bg-black h-[400px] w-full z-10'>
        <div className="container h-full">
            <div className="flex flex-col items-center justify-center h-full relative">
                {/* content */}
                <div className="flex flex-col items-center text-white">
                    <h1 className='font-bold text-5xl'>Brokers' Community</h1>
                    <p>A Community built for the brokers!</p>
                </div>
                {/* search form */}
                <form action={handleAutocomplete} className='bg-white w-2/4 rounded shadow p-1 flex items-center justify-between mt-5'>
                    <Search />
                    <input type="text" onChange={onKeywordUpdate} value={keyword} name='keyword' placeholder='Type for getting the data' className='p-2 flex-1 outline-none border-none' />
                    <select name="category" id="" className='border-l-2 pl-4 border-black'>
                        <option value="">All Categories</option>
                        {
                            categories && categories?.map(category=> <option key={category.id} value={category.slug}>{category.title}</option>)
                        }
                    </select>
                </form>     
                <div className={`absolute top-[68%] z-40 w-2/4 ${!(keyword || filter) && 'hidden'} h-[200px] overflow-y-auto`}>
                        <Card className={twMerge(
                            searchError ? 'bg-red-600 text-white border-red-600 outline-red-600' : '',
                            'rounded-none'
                        )}>
                            {
                                results && (
                                    <CardContent className='flex flex-col divide-y-2 space-y-4 border-none rounded-none p-2'>
                                        {
                                            results.map((resultItem : any)=> (
                                                <div onClick={()=>onListItemClick(resultItem.slug)} key={resultItem.id} className='cursor-pointer'>
                                                    <div className="flex flex-col">
                                                        {/*  */}
                                                        <h1 className='font-bold'>{resultItem.title}</h1>
                                                        <article className='text-sm font-light' dangerouslySetInnerHTML={{__html: resultItem.description}}></article>
                                                        <div className="mt-2 flex items-center gap-4">
                                                            <span className=''>Posted by: 
                                                                <span className="font-bold text-sm"> {resultItem?.user?.fname}{` `}{resultItem?.user?.lname}</span>
                                                            </span>
                                                            <span className='text-center'>{resultItem.created_at}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </CardContent>
                                )
                            }
                            {
                                (!results && !searchError) && <CardContent className='flex items-center justify-center p-4'>
                                    <LucideLoader className='animate-spin'/>
                                </CardContent>
                            }
                            {
                                (!results && searchError) && <CardContent className='flex items-center justify-center p-4'>
                                    <p className='font-bold'>{searchError}</p>
                                </CardContent>
                            }
                        </Card>
                </div>  
            </div>
        </div>
    </section>
  )
}

export default Header