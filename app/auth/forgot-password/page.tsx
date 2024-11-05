"use client";

import { handleForgetPassword } from '@/actions/auth-action';
import AuthButton from '@/components/auth/auth-button';
import AuthErrorStatus from '@/components/auth/error-status';
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { ResetSchema } from '@/schemas/reset-schema';
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {z} from 'zod';

const ForgotPasswordPage = () => {
    const [successMessage, setSuccessMessage] = useState<string>();
    const [errorGlobal, setErrorGlobal] = useState<string>();
    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: ''
        }
    });

    const onSubmitForm = async (values : z.infer<typeof ResetSchema>) => {
        console.log('Values: ', values);
        const response = await handleForgetPassword(values);
        if(response){
            console.log('resposne: ', response);
        }
        if(response?.errors || response?.exception){
            setSuccessMessage('');
            setErrorGlobal(response?.message);
        }else {
            setErrorGlobal('');
            setSuccessMessage(response?.message || 'Reset link setn');
        }
    }
  return (
    <section className='mt-12'>
        <Card className='sm:w-[400px] w-full m-auto mt-5'>
            <CardHeader>
                <h1 className='font-bold'>Forgot Passowrd</h1>
                <p className='font-light text-sm'>Request for a password reset link</p>
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
                                        <Input {...field} type="email" placeholder="Email to send reset link"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <AuthButton title='Reset Now' pending={form.formState.isSubmitting}/>
                    </form>                    
                </Form>
                {errorGlobal && <AuthErrorStatus error message={errorGlobal} />}
                {successMessage && <AuthErrorStatus message={successMessage} />}
            </CardContent>
        </Card>
    </section>
  )
}

export default ForgotPasswordPage