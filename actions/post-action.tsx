"user server";

import axios from "axios";

export async function fetchPosts(page : number){
    try{
        const url = 'http://localhost:8000/api/posts?page=' + page;
        console.log('Sending request to: ', url);
        const response = await axios.get(url, {
            headers: {
                'Accept': 'application/json'
            }
        });
        return response.data;
    }catch(error : any){
        throw new Error(error?.response?.data || 'No post found')
    }
}

export async function fetchPostStats(){
    try{
        const response = await axios.get('http://localhost:8000/api/posts/stats', {
            headers: {
                'Accept': 'application/json'
            }
        });
        return response.data;
    }catch(error : any){
        throw new Error(error?.response?.data || 'Failed to get stats')
    }
}

export async function fetchSinglePost(slug : string){
    try{
        const post = await axios.get(`http://localhost:8000/api/posts/fetch/${slug}`, {
            headers: {
                'Accept': 'application/json'
            }
        });
        return post.data;
    }catch(error){
        console.log('Error: ', error);
    }
}