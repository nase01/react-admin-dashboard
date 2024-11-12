import * as XLSX from "xlsx";
import { Logs, User } from "@/types";

export function generateUsersExcel(title: string, data: User[]) {
	// Create a new workbook
	const wb = XLSX.utils.book_new();

	// Transform the data into a format suitable for Excel
	const formattedData = data.map(user => ({
		"Name": user.name,
		"Email": user.email,
		"Role": user.role,
		"Active": user.active ? 'Yes' : 'No',
		"Created At": new Date(user.createdAt).toLocaleString(), // Format date
	}));

	// Convert the formatted data to a worksheet
	const ws = XLSX.utils.json_to_sheet(formattedData);
	
	// Append the worksheet to the workbook
	XLSX.utils.book_append_sheet(wb, ws, "Users");

	// Write the workbook to a file
	XLSX.writeFile(wb, `${title}.xlsx`);
}

export function generateLogsExcel(title: string, data: Logs[]) {
	// Create a new workbook
	const wb = XLSX.utils.book_new();

	// Transform the data into a format suitable for Excel
	const formattedData = data.map(log => ({
		"Info": log.info,
		"Created At": new Date(log.createdAt).toLocaleString(), // Format date
	}));

	// Convert the formatted data to a worksheet
	const ws = XLSX.utils.json_to_sheet(formattedData);
	
	// Append the worksheet to the workbook
	XLSX.utils.book_append_sheet(wb, ws, "Users");

	// Write the workbook to a file
	XLSX.writeFile(wb, `${title}.xlsx`);
}