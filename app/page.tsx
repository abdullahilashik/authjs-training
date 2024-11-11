import { fetchPostCategoryList } from "@/actions/category-action";
import { fetchPosts } from "@/actions/post-action";
import { auth } from "@/auth";
import BreadCrumb from "@/components/breadcrumb";
import PostList from "@/components/posts/post-lists";
import PostPagination from "@/components/posts/post-pagination";
import PostsSearch from "@/components/posts/posts-search";
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

export default async function Home({searchParams} : {
  searchParams?: {
    query: string, 
    page: string
  }
}) {  
  // const query = searchParams?.query || '';      
  const query = await searchParams;  
  const session = await auth();    
  const categories = await fetchPostCategoryList();   
    
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
            <PostsSearch categories={categories} />
          </div>
        </div>
        {/* post list */}
        <div className="py-12">
          <React.Suspense>
            <PostList query={query}/>
          </React.Suspense>
        </div>        
      </div>
    </section>    
  );
}
