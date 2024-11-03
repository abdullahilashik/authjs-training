"use client";

import {handleSignOut} from '@/actions/auth-action';

import React from 'react'
import { Button } from '../ui/button';
import {LogOut} from 'lucide-react';

const AuthLogoutButton = () => {
  return (
    <form action={handleSignOut}>
        <Button variant={'default'}>
            <LogOut />
            <span>Sign Out</span>
        </Button>
    </form>
  )
}

export default AuthLogoutButton