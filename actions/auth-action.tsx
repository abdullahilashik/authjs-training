"use server";

import {signIn, signOut} from '@/auth';
import {z} from 'zod';
import { SignInSchema } from '@/schemas/signin-schema';
import { AuthError } from 'next-auth';

export const handleSignIn = async({email, password} : (z.infer<typeof SignInSchema>)) => {
    try{
        await signIn('credentials', {email, password, redirectTo: '/'});
    }catch(error){
        if(error instanceof AuthError){
            switch(error.type){
                case 'CredentialsSignin':
                    return {
                        message: 'Invalid credentials'
                    }
                default:
                    return {
                        message: 'Something went wrong!'
                    }
            }
        }
        throw error;
    }    
}

export async function handleSignOut(){
    await signOut({redirectTo: '/auth/signin'});
}

export async function handleGithubSignIn(){
    await signIn('github', {redirectTo: '/'});
}