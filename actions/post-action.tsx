"user server";

import axios from "axios";

export async function fetchPosts(){
    try{
        const response = await axios.get('http://localhost:8000/api/posts', {
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