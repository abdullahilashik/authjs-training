import BreadCrumb from "@/components/breadcrumb";
import StatsCard from "@/components/stats";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {SquarePen} from 'lucide-react';

export default function Home() {
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
                <SelectItem value="compliance">Compliance</SelectItem>
                <SelectItem value="others">Others</SelectItem>
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
      </div>
    </section>    
  );
}
