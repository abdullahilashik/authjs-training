"user server";

import axios from "axios";

export async function fetchPostStats(){
    try{
        const response = await axios.get('http://localhost:8000/api/posts/stats');
    }catch(error){
        // fetch post stats errors
    }
}