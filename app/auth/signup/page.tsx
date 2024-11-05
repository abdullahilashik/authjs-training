"use client";

import AuthCardFooter from '@/components/auth/card-footer'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
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
import AuthButton from '@/components/auth/auth-button';
import { handleSignIn, handleSignUp } from '@/actions/auth-action';
import AuthErrorStatus from '@/components/auth/error-status';
import SocialAuthContainer from '@/components/auth/social-auth-container';
import { SignupSchema } from '@/schemas/signup-schema';
import { signIn } from '@/auth';
import { redirect } from 'next/navigation';

const SignUpPage = () => {
  const [globalError, setGlobalError] = useState<string | undefined>('');
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      fname: '',
      lname: '',
      phone: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof SignupSchema>) => {
    console.log('Signup Values: ', values);
    const result = await handleSignUp(values);    
    if(result?.errors){
      // something went wrong
      console.log('Error on client: ', result);
      setGlobalError(result.message);
    }else{
      setGlobalError('');      
      redirect('/'); // if not redirect from the server action redirect here
    }
    // if(result){
    //   setGlobalError(result.message);
    // }
  }

  return (
    <section>
        <div className="container">
          <Card className='sm:w-[600px] w-full m-auto mt-5'>
            <CardHeader>
              <h1>Register to Get Access</h1>
            </CardHeader>
            <CardContent>
            <Form {...form} >
                <form className='grid grid-cols-2 gap-4' onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    name='fname'
                    control={form.control}
                    render={({field})=> (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input type='text' placeholder='Your first name' {...field}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField 
                    name='lname'
                    control={form.control}
                    render={({field})=>(
                      <FormItem>
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                          <Input {...field} type='text' placeholder='Your last name' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField 
                    name='phone'
                    control={form.control}
                    render={({field})=> (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input {...field} type="tel" placeholder='A valid phone number' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                  <FormField 
                  control={form.control} 
                  name='password_confirmation' 
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type='password' placeholder='*****' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <AuthButton  title='Sign Up' pending={form.formState.isSubmitting} />
                  <FormMessage />
                </form>
              </Form>

              <SocialAuthContainer />
            </CardContent>
            <CardFooter className='flex flex-col items-center'>
              {globalError && <AuthErrorStatus error message={globalError} />}
              <AuthCardFooter title={`Already have an account?`} labelHref='/auth/signin' labelText='Login now' />
            </CardFooter>
          </Card>
        </div>
    </section>
  )
}

export default SignUpPage