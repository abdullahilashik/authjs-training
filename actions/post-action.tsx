"user server";

import axios from "axios";

export async function fetchPosts(query){
    try{
        const page = query?.page || 1;
        // const url = 'http://localhost:8000/api/posts?page=' + page;
        // const response = await axios.get(url, {
        //     headers: {
        //         'Accept': 'application/json'
        //     }
        // });
        // return response.data;
        const url = 'http://localhost:8000/api/posts/search';
        // const newUrl = 'http://localhost:8000/api/posts/search?query=payg-asset-p';
        let newUrl = new URL(url);
        newUrl.search = new URLSearchParams(query);
        console.log('Sending request to: ', newUrl.href);
        const config = {
            headers: {
                'Accept': 'application/json'
            }
        };
        const response = await axios.get(newUrl.href, config);
        console.log('Resonse: ', response.data);
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

export async function increaseView(postId: number, token: string) {
    try{
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };
        const response = await axios.get('http://localhost:8000/api/posts/view-increase/'+postId , config);        
        return response.data;
    }catch(error : any){
        throw new Error(error?.response?.data || 'Failed to update views');
    }
}

export async function toggleFavorite(postId: number, token: string){
    try{
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };
        const response = await axios.get('http://localhost:8000/api/posts/favorite-toggle/'+postId , config);        
        return response.data;
    }catch(error){
        throw new Error(error?.response?.data || 'Failed to update views');
    }
}
export async function toggleBookmark(postId: number, token: string){
    try{
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };
        const response = await axios.get('http://localhost:8000/api/posts/bookmark-toggle/'+postId , config);        
        return response.data;
    }catch(error){
        throw new Error(error?.response?.data || 'Failed to update views');
    }
}