import React from 'react'
import {Eye} from 'lucide-react';
import { Button } from '../ui/button';

const ViewCount = ({post} : {post: any}) => {  
  return (
    <Button size={'sm'} variant={'link'} className='flex gap-1'>
        <Eye />
        <span>{post?.view_count || 0}</span>
    </Button>
  )
}

export default ViewCount