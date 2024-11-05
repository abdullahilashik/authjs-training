import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logoOxcel from '@/public/images/logo-oxcel.png';
import logoPrimary from '@/public/images/primary-logo.png';
import {Bell, LogOut} from 'lucide-react';
import {buttonVariants} from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { auth } from '@/auth';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import AuthLogoutButton from '../auth/logout-button';

const Navbar = async () => {
  const session = await auth();
  console.log('Session: ', session);
  return (
    <section className='sticky top-0 z-10 bg-white backdrop-blur-md'>
      <div className="container">
        <div className="flex items-center justify-between p-4">
          {/* logo */}
          <div className="flex items-center gap-4">
            <Link href={'/'}>
              <Image src={logoOxcel} alt='Oxcel Logo' />              
            </Link>
            <Link href={'/'} className='border-l-2 border-black pl-4'>
              <Image src={logoPrimary} alt='Primary Logo' />
            </Link>
          </div>
          {/* action buttons */}
          <ul className="flex items-center gap-4">
            <Link href={'/'} className='pr-4 border-r-2 text-xl font-bold border-black'>Leaders Panel</Link>            
            {
              !session && (
                <>                  
                  <Link href={'/auth/signin'} className={buttonVariants({variant: 'default'})}>
                    <LogOut />
                    <span>Login</span>
                  </Link>                                
                </>
              )
            }            
            
            {
              session && (
                <>
                <Popover>
                    <PopoverTrigger asChild>
                      <Bell />
                    </PopoverTrigger>
                    <PopoverContent>

                    </PopoverContent>
                  </Popover>
                  
                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar>
                      <AvatarImage src={session?.user?.image || 'https://github.com/shadcn.png'} alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent>
                    <ul className="flex flex-col items-start">                      
                      <Link href={'/account'} className={buttonVariants({variant: 'link'}) + `w-full text-left`}>Hi, {session?.user?.name}!</Link>                      
                    </ul>
                  </PopoverContent>
                </Popover>
                </>
              )
            }
            {session && <AuthLogoutButton />}
            
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Navbar