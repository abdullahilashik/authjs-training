import React from 'react'
import { twMerge } from 'tailwind-merge'
import {TriangleAlert, CircleCheck} from 'lucide-react';

interface AuthErrorInterface {
    error? : boolean
    message: string
}

const AuthErrorStatus = ({error, message} : AuthErrorInterface) => {
  return (
    <div className={twMerge(`flex items-center p-2 text-sm rounded shadow gap-2 my-4`, error ? 'bg-red-500/20 text-red-600' : 'bg-emerald-500/20 text-emerald-600')}>
        {error ? <TriangleAlert /> : <CircleCheck />}
        <span>{message}</span>
    </div>
  )
}

export default AuthErrorStatus