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

function TaskReportPagination() {
  return (
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
  );
}

export default TaskReportPagination;
