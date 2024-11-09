"use client"

import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import TinyEditor from './tiny-editor';
import { Button } from '../ui/button';
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { postCommentAction } from '@/actions/commnet-action';
import { useSession } from 'next-auth/react';
import AuthErrorStatus from '../auth/error-status';

const CommentSchema = z.object({
    comment: z.string({
        required_error: 'Comment is Required'
    }).min(1, {
        message: 'Minimum length is required'
    }),
    post_id: z.string()
})

const PostComment = ({postId} : {postId: string}) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const {data: session} = useSession();
    const {
        register,
        control,
        formState: {errors, isSubmitting},
        handleSubmit
    } = useForm<z.infer<typeof CommentSchema>>({
        resolver: zodResolver(CommentSchema),
        defaultValues: {
            comment: '',
            post_id: ''
        }
    });

    const onCommentSubmit = async (values: z.infer<typeof CommentSchema>) => {
        
        try{
            const response = await postCommentAction(values.comment, session?.user?.token, postId)  
            if(response.errors || response.exception){
                setErrorMessage(response.message);
            } else {
                setSuccessMessage(response.message);
            }
        }catch(error : any){
            console.log('Client error: ', error);
            setErrorMessage(error.message || 'Failed to comment');
        }
    }

  return (
    <>
        <form onSubmit={handleSubmit(onCommentSubmit)} className='w-full mt-5'>
            <input type="hidden" value={postId} name='post_id' />
                <div className="flex flex-col items-start gap-1">
                    <label htmlFor="comment">Comment</label>
                    <Controller name='comment' control={control} render={({field}) => (
                        <TinyEditor field={field} />
                    )} />
                    {errors.comment && <span className='text-red-600 font-bold'>{errors?.comment.message}</span>}                    
                </div>
                {errorMessage && <AuthErrorStatus error message={errorMessage} />}
                {successMessage && <AuthErrorStatus message={successMessage} />}
                <Button type='submit' className='mt-5'>Post Comment</Button>
        </form>
    </>
  )
}

export default PostComment