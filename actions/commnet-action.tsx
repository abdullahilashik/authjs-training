"user server"

import axios from "axios";
import { revalidatePath } from "next/cache";
/**
 * Post comment into the backend using api
 * @param comment 
 * @param token 
 * @param post_id 
 * @returns 
 */
export async function postCommentAction(comment: string, token: string, post_id: string) {
    try{
        const headers = {
            headers: {
                'Accept' : 'application/json',
                'Authorization' : 'Bearer '+ token
            }
        };
        const paylaod = {
            post_id,
            comment
        };        
        const response = await axios.post('http://localhost:8000/api/posts/comment', paylaod, headers);        
        return response.data;
    }catch(error : any){        
        throw new Error(error?.response?.data || 'Failed to post comment');
    }
}

export async function getCommentsPaginated(postId: number, token: string){
    try{
        console.log('Received token: ', token);
        const config = {headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
          }};
        const url = 'http://localhost:8000/api/posts/comment/' + postId;
        
        const response = await fetch(url, {
            method: 'GET',
            headers: config.headers,
            next: {
                revalidate: 3,                
            },
            cache: 'no-store'
        })
        return await response.json();
    }catch(error : any){
        throw new Error(error?.response?.data || 'Error fetching comments');
    }
}

export async function postCommentReply (comment: string, comment_id: number, token: string) {
    try{
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };
        const payload = {
            comment, comment_id
        };
        const response = await axios.post('http://localhost:8000/api/posts/comment/reply', payload, config);
        console.log('Reply response: ', response.data);        
        return response.data;
    }catch(error : any){
        console.log('error: ', error);
        throw new Error(error?.response?.data || 'Failed to post comment');
    }
}