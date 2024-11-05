"use client";

import AuthButton from '@/components/auth/auth-button';
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { ResetSchema } from '@/schemas/reset-schema';
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {z} from 'zod';
import { useSearchParams } from 'next/navigation'
import { handlePasswordUpdate } from '@/actions/auth-action';
import AuthErrorStatus from '@/components/auth/error-status';


export const ParamProps  = z.object({
    email: z.string(),
    token: z.string(),
    password: z.string()
})

const ResetPasswordPage =  () => {
    const [errorMessage, setErrorMessage] = useState<string>();
    const [successMessage, setSuccessMessage] = useState<string>();
    const searchParams = useSearchParams();    

    const form = useForm<z.infer<typeof ParamProps>>({
        resolver: zodResolver(ParamProps),
        defaultValues: {
            email: searchParams.get('email') || '',
            token: searchParams.get('token') || '',
            password: ''
        }
    });

    const onSubmitForm = async (values : z.infer<typeof ParamProps>) => {
        console.log('Values: ', values);
        const response = await handlePasswordUpdate(values);
        if(response.errors || response.exception){
            setSuccessMessage('');
            setErrorMessage(response?.message || 'Failed to update password');
        } else {
            setErrorMessage('');
            setSuccessMessage(response?.message || 'Password updated');
        }
    }
  return (
    <section className='mt-12'>
        <Card className='sm:w-[400px] w-full m-auto mt-5'>
            <CardHeader>
                <h1 className='font-bold'>Reset Passowrd</h1>
                <p className='font-light text-sm'>Update Your Password</p>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className='space-y-4' onSubmit={form.handleSubmit(onSubmitForm)}>
                        <FormField 
                            name='email'
                            control={form.control}
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="email" disabled placeholder="Email to send reset link"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField 
                            name='token'
                            control={form.control}
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Token</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="text" disabled/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField 
                            name='password'
                            control={form.control}
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password" placeholder="*****"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <AuthButton title='Reset Now' pending={form.formState.isSubmitting}/>
                    </form>
                    {errorMessage && <AuthErrorStatus error message={errorMessage} />}
                    {successMessage && <AuthErrorStatus message={successMessage} />}
                </Form>
            </CardContent>
        </Card>
    </section>
  )
}

export default ResetPasswordPage