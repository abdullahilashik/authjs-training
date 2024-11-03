import Link from 'next/link'
import React from 'react'
import {House, ChevronRight} from 'lucide-react';

const BreadCrumb = () => {
  return (
    <>
        <div className="flex items-center gap-1">
            <Link href={'/'}>
                <House /> 
            </Link>
            <ChevronRight />
            <Link href={'/'}>Community</Link>
        </div>
    </>
  )
}

export default BreadCrumb