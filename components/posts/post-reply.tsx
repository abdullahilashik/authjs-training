"use client";

import React from 'react'
import { Controller, useForm } from "react-hook-form";
import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { postCommentReply } from '@/actions/commnet-action';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


export const ReplySchema = z.object({
  comment: z.string({
    required_error: 'You must provide a reply'
  }).min(2, {
    message: 'Minimum length is 2'
  })
});

export const revalidate = 0;

const PostReply = ({comment} : {comment: any}) => {
    const {data: session} = useSession();   
    const router = useRouter();   
  

    const {control, register, handleSubmit, formState: {errors, isSubmitting}} = useForm<z.infer<typeof ReplySchema>>({
        resolver: zodResolver(ReplySchema),
        defaultValues: {
          comment: ''
        }
      });
    
      const onHandleReply = async (values: z.infer<typeof ReplySchema>) => {        
        const response = await postCommentReply(values.comment, comment.id, session?.user?.token);
        if(response){
            router.refresh();
        }
      }
      
  return (
    <>
        <div className="grid grid-cols-12 mt-8">
            <div className="col-span-1"></div>
            <div className="col-span-11">
              <span>Replies ({comment.replies.length})</span>  
              {
                comment.replies && comment.replies.map(reply=>(
                  <div key={reply.id} className='mt-3'>
                    <div className="flex flex-col items-start p-4 rounded shadow bg-white gap-4">
                      <div className="flex items-center gap-2">
                          {/* <x-user.avatar image="{{$comment->image_path}}" small /> */}
                          <div className="flex flex-col">
                              <h4 className="font-bold text-xl capitalize text-black">
                                  {reply.user.fname} {` `} {reply.user.lname}
                              </h4>
                              <span className="text-sm font-light">{reply.created_at}</span>
                          </div>
                      </div>
                      <article>{reply.comment}</article>
                  </div>
                  </div>
                ))
              }            
              <form onSubmit={handleSubmit(onHandleReply)} className="flex flex-col mt-3 border" method="post">                
                <div className="flex items-center">
                  {/* <x-user.avatar /> */}                  
                  <Controller control={control} name="comment" render={({field})=> (
                    <input
                    {...field}
                    type="text"             
                    onChange={(e) => field.onChange(e.target.value)}
                    className="p-4 rounded shadow flex-1 text-black pl-4"
                    placeholder="speak your mind!"
                    />
                  )} />
                  
                </div>
                {errors?.comment && <span className="text-red-600 font-semibold">{errors?.comment?.message}</span>}
                <button disabled={isSubmitting} className="btn btn-primary ml-auto">{isSubmitting ? 'Please wait...' : 'Reply' }</button>
              </form>
            </div>
          </div>
    </>
  )
}

export default PostReply