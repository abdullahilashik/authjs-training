import { fetchPostCategoryList } from "@/actions/category-action";
import { fetchPosts } from "@/actions/post-action";
import BreadCrumb from "@/components/breadcrumb";
import PostList from "@/components/posts/post-lists";
import PostPagination from "@/components/posts/post-pagination";
import StatsCard from "@/components/stats";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {SquarePen} from 'lucide-react';


export default async function Home() {  

  // const page = 1;
  const posts = await fetchPosts(1);
  const categories = await fetchPostCategoryList();

  console.log('Posts: ', posts);
    
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
            <Select>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                
                {categories.map(category=> <SelectItem value={category.slug} key={category.id}>{category.title}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* post list */}
        <div className="py-12">
          <PostList posts={posts.data} />
        </div>
        {posts && <PostPagination links={posts.links} />}
      </div>
    </section>    
  );
}
