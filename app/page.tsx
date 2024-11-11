import { fetchPostCategoryList } from "@/actions/category-action";
import { fetchPosts } from "@/actions/post-action";
import { auth } from "@/auth";
import BreadCrumb from "@/components/breadcrumb";
import PostList from "@/components/posts/post-lists";
import PostPagination from "@/components/posts/post-pagination";
import StatsCard from "@/components/stats";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";
import {SquarePen} from 'lucide-react';
import { revalidatePath } from "next/cache";
import React from "react";
import {z} from 'zod';

export const SearchSchema = z.object({
  category: z.string(),
  sortType: z.string()
})

export default async function Home() {  
  const session = await auth();
  // const page = 1;
  let posts = await fetchPosts(1);
  const categories = await fetchPostCategoryList();

  const handleSubmitForm = async (values) => {
    "use server";    
    // await fetchData(values.get('category'), values.get('sort'));
    const payload = {
        query: values.get('category'), 
        filter: values.get('sort')
      };
      console.log('Sending in the pyaload: ', payload);
      try{
          const response = await axios.post('http://localhost:8000/api/posts/search', 
            payload, 
            {
              headers: {
                  'Accept': 'application.json',
                  'Authorization': 'Bearer ' + session?.user?.token
              }
          });

          console.log('Search Results: ', response.data);
          // revalidatePath('/','layout');
          posts = response.data          
      }catch(error){
          console.log("Failed to load data");          
      }
  }  
    
  return (
    <section className="py-12">
      <div className="container mx-auto">    
        <BreadCrumb />
        <StatsCard />
        {/* filter method */}
        <div className="flex items-center justify-between py-12">
          <Button>
            <SquarePen />
            <span>Create New</span>            
          </Button>
          {/* filter action */}
          <div className="flex items-center gap-4">            
            <form action={handleSubmitForm} className="inline-flex gap-2 items-center">
              <Select name="category">
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>                  
                  {categories.map(category=> <SelectItem value={category.slug} key={category.id}>{category.title}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select name="sort">
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                </SelectContent>
              </Select>
              <Button type="submit">Search</Button>
            </form>
          </div>
        </div>
        {/* post list */}
        <div className="py-12">
          <React.Suspense>
            <PostList posts={posts.data} />
          </React.Suspense>
        </div>
        {posts && <PostPagination links={posts.links} />}
      </div>
    </section>    
  );
}
