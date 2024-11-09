"use client"

import React, { useEffect, useState } from 'react'
import { Card, CardContent } from './ui/card'
import {Users, Newspaper} from 'lucide-react';
import { fetchPostStats } from '@/actions/post-action';

const StatsCard = () => {
    const [statData, setStatData] = useState();
    // const statData = await fetchPostStats();    
    useEffect(()=> {
        fetchPostStats()
            .then(response=>{
                setStatData(response);
            });
    }, []);

    return (
        <section className='mt-5 mx-auto flex items-center justify-center gap-8 '>
            <Card className='w-fit'>
                <CardContent className='flex items-center gap-2 justify-center p-8'>
                    <Users size={50}/>
                    <div className="flex flex-col leading-tight gap-0 space-y-0">
                        <span className='font-bold text-3xl'>{statData?.total_members || 0}</span>
                        <span className='font-light text-sm'>Users</span>
                    </div>           
                </CardContent>            
            </Card>
            <Card className='w-fit'>
                <CardContent className='flex items-center gap-2 justify-center p-8'>
                    <Newspaper size={50}/>
                    <div className="flex flex-col leading-tight gap-0 space-y-0">
                        <span className='font-bold text-3xl'>{statData?.total_posts || 0 }</span>
                        <span className='font-light text-sm'>Total Posts</span>
                    </div>
                </CardContent>
            </Card>
            <Card className='w-fit'>
                <CardContent className='flex items-center gap-2 justify-center p-8'>                
                    <Newspaper size={50} />
                    <div className="flex flex-col leading-tight gap-0 space-y-0">
                        <span className='font-bold text-3xl'>{statData?.total_posts_month || 0}</span>
                        <span className='font-light text-sm'>This Month</span>
                    </div>              
                </CardContent>
            </Card>
        </section>
    )
}

export default StatsCard