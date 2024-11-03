import React from 'react'
import { Button } from '@/components/ui/button'

interface PageProps {
    title: string,
    pending?: boolean
}

const AuthButton = ({title, pending} : PageProps) => {
  return (
    <Button type='submit' disabled={pending}>{pending ? 'Please wait...' : title}</Button>
  )
}

export default AuthButton