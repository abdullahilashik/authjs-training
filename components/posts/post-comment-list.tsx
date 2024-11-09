"use client";

import { getCommentsPaginated } from "@/actions/commnet-action";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { Suspense, useEffect, useState } from "react";

import PostReply from "./post-reply";



const PostCommentList = ({ postId }: { postId: number }) => {
  const { data: session } = useSession();
  const [comments, setComments] = useState(null);

  

  useEffect(() => {
    if (session) {
      getCommentsPaginated(postId, session?.user?.token).then((response) => {
        console.log("Received comments inside componnet: ", response);
        setComments(response);
      });
    }
  }, [session]);

  if (!comments) {
    return null;
  }

  return (
    <>
      {comments.data?.map((comment: any) => (
        <div className="flex flex-col mb-5" key={comment.id}>
          {/* start: post comment */}
          <div className="flex flex-col items-start p-4 rounded shadow bg-white gap-4">
            <div className="flex items-center gap-2">
              {/* <Image src={} /> */}
              <div className="flex flex-col">
                <h4 className="font-bold text-xl capitalize text-black">
                  {comment.fname}{` `}{comment.lname}
                  {/* @if($reply)
                            {{$comment->user->fname. ' '. $comment->user->lname}}
                        @else
                            {{$comment->fname. ' '. $comment->lname}}
                        @endif
                        @if ($post->uid == $comment->user_id)
                            <span className="badge text-[9px]">author</span>
                        @endif */}
                        {/* <span className="badge text-[9px]">author</span> */}
                </h4>
                <span className="text-sm font-light">{comment.created_at}</span>
              </div>
            </div>
            <article dangerouslySetInnerHTML={{__html: comment.comment}}></article>
          </div>
          {/* post comment end */}
          <React.StrictMode>
            <Suspense>
              <PostReply comment={comment} />
            </Suspense>
          </React.StrictMode>
        </div>
      ))}
    </>
  );
};

export default PostCommentList;
