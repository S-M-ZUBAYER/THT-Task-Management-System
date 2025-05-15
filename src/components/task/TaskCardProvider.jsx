import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { TaskCard } from "./TaskCard";

function TaskCardProvider() {
  return (
    <div className=" gap-4 border border-[#E6ECF0] rounded-xl pt-4 pb-2 px-2">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-bold text-[#004368] mb-3">In Progress</h2>
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" style={{ color: "#004368" }} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" style={{ color: "#004368" }}>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive style={{ color: "#004368" }}>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" style={{ color: "#004368" }}>
                  3
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" style={{ color: "#004368" }} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
      <div className="flex gap-2">
        <TaskCard />
        <TaskCard />
      </div>
    </div>
  );
}

export default TaskCardProvider;
