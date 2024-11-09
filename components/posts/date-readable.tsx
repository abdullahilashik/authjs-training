import React from 'react';
import { parseISO, format } from 'date-fns';


const DateReadable = ({dateString} : {dateString : string}) => {
  return (
    <span className='text-[10px]'>
        {format(parseISO(dateString), 'LLLL d, yyyy')}
    </span>
  )
}

export default DateReadable