import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  return (
    <div className="flex justify-between items-center mt-4">
      <Button 
        className="rounded-button" 
        variant="outline" 
        size="icon"
        disabled={!hasPreviousPage}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ArrowLeft />
      </Button>
      <span>Page {currentPage} / {totalPages}</span>
      <Button 
        className="rounded-button" 
        variant="outline" 
        size="icon"
        disabled={!hasNextPage}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ArrowRight />
      </Button>
    </div>
  );
};

export default Pagination;