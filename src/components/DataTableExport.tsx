import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Download, FileText, Sheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
	DropdownMenuShortcut
} from "@/components/ui/dropdown-menu";

interface DataTableExportProps {
	exportData?: (type: string) => void;
}

export function DataTableExport({ exportData }: DataTableExportProps) {
	const handleExport = (type: string) => {
		if (exportData) {
			exportData(type);
		}
	};

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="ml-1 h-8 lg:flex">
          <Download className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Export Data</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleExport("pdf")}>
					.pdf	<DropdownMenuShortcut><FileText className="w-4" /></DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleExport("excel")}>
					.xlsx <DropdownMenuShortcut><Sheet className="w-4" /></DropdownMenuShortcut>
				</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}