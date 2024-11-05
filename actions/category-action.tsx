"user server";

import axios from "axios";

export async function fetchPostCategoryList(){
    try{
        const response = await axios.get('http://localhost:8000/api/category/category-list', {
            headers: {
                'Accept': 'application/json'
            }
        });
        return response.data;
    }catch(error : any){
        return error?.response?.data || 'Could not get category list';
    }
}