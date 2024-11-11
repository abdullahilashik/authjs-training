"use server";

import {signIn, signOut} from '../auth';
import {z} from 'zod';
import { SignInSchema } from '@/schemas/signin-schema';
import { AuthError } from 'next-auth';
import { SignupSchema } from '@/schemas/signup-schema';
import axios from 'axios';
import { ResetSchema } from '@/schemas/reset-schema';
import { ParamProps } from '@/app/auth/reset-password/page2';

export const handleSignIn = async({email, password} : (z.infer<typeof SignInSchema>)) => {
    try{
        await signIn(
            'credentials', 
            {
                email, 
                password, 
                redirectTo: '/'
            });
    }catch(error : any){                
        if(error instanceof AuthError){
            switch(error.type){
                case 'CredentialsSignin':
                    return {
                        message: 'Invalid credentials'
                    }
                case 'CallbackRouteError':
                    return {
                        message: error?.cause?.err?.message || 'Failed to sign in'
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

export const handleSignUp = async(values : z.infer<typeof SignupSchema>) => {
    try{
        
        const response = await axios.post('http://localhost:8000/api/register', values, {
            headers: {
                'Accept' : 'application/json'
            }
        });
        // await handleSignIn(values);
    }catch(error : any){
        
        return error?.response?.data;
    }
}

export const handleForgetPassword = async (values: z.infer<typeof ResetSchema>) => {
    try{
        
        const response = await axios.post('http://localhost:8000/api/forgot-password', values, {
            headers: {
                'Accept' : 'application/json'
            }
        });        
        return response?.data;
    }catch(error: any){
        
        return error?.response?.data || 'Error sending reset link request';
    }
}

export const handlePasswordUpdate = async(values : z.infer<typeof ParamProps>) => {
    try{
        const response = await axios.post('http://localhost:8000/api/reset-password', {...values, 'password_confirmation': values.password}, {
            headers: {
                'Accept': 'application/json'
            }
        });
        return response?.data;
    }catch(error : any){
        return error?.response?.data || 'Failed to update password';
    }
}

export async function handleSignOut(){
    await signOut({redirectTo: '/auth/signin'});
}

export async function handleGithubSignIn(){
    await signIn('github', {redirectTo: '/'});
}