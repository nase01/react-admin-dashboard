import { Button } from "@/components/ui/button";
import {  ChevronFirst, ChevronLast, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select";
import Tooltip from "@/components/shared/Tooltip";

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
	onPageChange: (page: number) => void;
	pageSize: number;
  onSizeChange: (size: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({ currentPage, totalPages, onPageChange, pageSize, onSizeChange }) => {
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  return (
		<div className="flex items-center space-x-6 lg:space-x-8">
			<div className="flex items-center space-x-2">
				<Tooltip message="Rows per page">
					<Select
						value={`${pageSize}`}
						onValueChange={(value) => onSizeChange(Number(value))}
					>
						<SelectTrigger className="h-8 w-[70px]">
							<SelectValue placeholder={`${pageSize}`} />
						</SelectTrigger>
						<SelectContent side="top">
							{[10, 20, 30, 40, 50].map((pageSize) => (
								<SelectItem key={pageSize} value={`${pageSize}`}>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</Tooltip>
			</div>
			<div className="flex w-[100px] items-center justify-center text-sm font-medium">
				Page {currentPage} of {totalPages}
			</div>
			<div className="flex items-center space-x-2">
				<Button
					variant="outline"
					className="hidden h-8 w-8 p-0 lg:flex"
					onClick={() => onPageChange(1)}
					disabled={!hasPreviousPage}
				>
					<span className="sr-only">Go to first page</span>
					<ChevronFirst className="h-4 w-4" />
				</Button>

				<Button 
					className="h-8 w-8 p-0" 
					variant="outline" 
					size="icon"
					disabled={!hasPreviousPage}
					onClick={() => onPageChange(currentPage - 1)}
				>
					<span className="sr-only">Go to previous page</span>
					<ChevronLeftIcon className="h-4 w-4" />
				</Button>

				<Button 
					className="h-8 w-8 p-0" 
					variant="outline" 
					size="icon"
					disabled={!hasNextPage}
					onClick={() => onPageChange(currentPage + 1)}
				>
					<span className="sr-only">Go to next page</span>
					<ChevronRightIcon className="h-4 w-4" />
				</Button>

				<Button
					variant="outline"
					className="hidden h-8 w-8 p-0 lg:flex"
					onClick={() => onPageChange(totalPages)}
					disabled={!hasNextPage}
				>
					<span className="sr-only">Go to last page</span>
					<ChevronLast className="h-4 w-4" />
				</Button>
			</div>
		</div>
  );
};

export default CustomPagination;