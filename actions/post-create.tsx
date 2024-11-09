"user server";

import axios from "axios";



export const handlePostCreate = async (formData : any, token?: string | undefined) => {
    try{
        console.log('Form data: ', formData, token);
        const config = {
            headers: {
                'Accept': 'application/json',                
                'Authorization': 'Bearer '+ token
            }
        };
        const url = `http://localhost:8000/api/posts/create`;
        const response = await axios.post(url, formData, config);
        return response.data;
    }catch(error){
        console.log('Error: ', error)
    }
}