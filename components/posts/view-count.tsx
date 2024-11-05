import React from 'react'
import {Eye} from 'lucide-react';
import { Button } from '../ui/button';

const ViewCount = () => {
  return (
    <Button size={'sm'} variant={'link'} className='flex gap-1'>
        <Eye />
        <span>2</span>
    </Button>
  )
}

export default ViewCount