import Link from 'next/link'
import React from 'react'
import { buttonVariants } from '../ui/button'

interface PageProps {
    title: string,
    labelText: string,
    labelHref: string
}

const AuthCardFooter = ({title, labelText, labelHref } : PageProps) => {
  return (
    <>
        <h4>{title}</h4>
        <Link href={labelHref} className={buttonVariants({variant: 'link'})}>{labelText}</Link>
    </>
  )
}

export default AuthCardFooter