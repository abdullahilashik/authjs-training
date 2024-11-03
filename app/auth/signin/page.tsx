"use client";

import AuthCardFooter from '@/components/auth/card-footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import React, { useState } from 'react'
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage  
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { SignInSchema } from '@/schemas/signin-schema'
import AuthButton from '@/components/auth/auth-button';
import { handleSignIn } from '@/actions/auth-action';
import AuthErrorStatus from '@/components/auth/error-status';
import SocialAuthContainer from '@/components/auth/social-auth-container';

const SignInPage = () => {
  const [globalError, setGlobalError] = useState<string | undefined>('');
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof SignInSchema>) => {
    console.log('Values: ', values);
    const result = await handleSignIn(values);
    if(result){
      setGlobalError(result.message);
    }
  }

  return (
    <section>
        <div className="container">
          <Card className='sm:w-[400px] w-full m-auto mt-5'>
            <CardHeader>
              <h1>Login to Get Access</h1>
            </CardHeader>
            <CardContent>
            <Form {...form} >
                <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" placeholder='Your email address' />
                        </FormControl>                      
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField 
                  control={form.control} 
                  name='password' 
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type='password' placeholder='*****' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <AuthButton title='Sign In' pending={form.formState.isSubmitting} />
                  <FormMessage />
                </form>
              </Form>

              <SocialAuthContainer />
            </CardContent>
            <CardFooter className='flex flex-col items-center'>
              {globalError && <AuthErrorStatus error message={globalError} />}
              <AuthCardFooter title={`Don't have an account?`} labelHref='/auth/signup' labelText='Create an Acount' />
            </CardFooter>
          </Card>
        </div>
    </section>
  )
}

export default SignInPage