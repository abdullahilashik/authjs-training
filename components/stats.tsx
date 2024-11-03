import React from 'react'
import { Card, CardContent } from './ui/card'
import {Users} from 'lucide-react';

const StatsCard = () => {
  return (
    <section className='mt-5 mx-auto flex items-center justify-center gap-8 absolute top-[420px] left-1/2 -translate-x-1/2'>
        <Card className='w-fit p-4'>
            <CardContent className='flex items-center gap-2 justify-center'>
                <Users size={50}/>
                <div className="flex flex-col leading-tight gap-0 space-y-0">
                    <span className='font-bold text-3xl'>39</span>
                    <span className='font-light text-sm'>Users</span>
                </div>           
            </CardContent>            
        </Card>
        <Card className='w-fit p-4'>
            <CardContent className='flex items-center gap-2 justify-center'>
                <Users size={50}/>
                <div className="flex flex-col leading-tight gap-0 space-y-0">
                    <span className='font-bold text-3xl'>39</span>
                    <span className='font-light text-sm'>Total Posts</span>
                </div>              
            </CardContent>
        </Card>
        <Card className='w-fit p-4'>
            <CardContent className='flex items-center gap-2 justify-center'>
                <Users size={50}/>
                <div className="flex flex-col leading-tight gap-0 space-y-0">
                    <span className='font-bold text-3xl'>39</span>
                    <span className='font-light text-sm'>Posts This Month</span>
                </div>              
            </CardContent>
        </Card>
    </section>
  )
}

export default StatsCard