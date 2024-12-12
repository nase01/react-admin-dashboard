import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Logs, User } from "@/types";

export const generateUsersPdf = (title: string, data: User[]) => {
    // Initialize jsPDF
    const doc = new jsPDF();

    // Set the title
    doc.setFontSize(18);
    doc.text(title, 14, 20);

    // Prepare table data
    const tableData = data.map((user) => [
        user.name,
        user.email,
        user.role,
        user.active ? "Yes" : "No",
        new Date(user.createdAt).toLocaleDateString(),
    ]);

    // AutoTable configuration
    autoTable(doc, {
        startY: 30, // Set the starting Y position of the table
        head: [["Name", "Email", "Role", "Active", "Created At"]],
        body: tableData,
        theme: "grid", // Optional: 'striped', 'grid', 'plain'
    });

    // Save the PDF
    doc.save(`${title}.pdf`);
};

export const generateLogsPdf = (title: string, data: Logs[]) => {
	
	const doc = new jsPDF();

	doc.setFontSize(18);
	doc.text(title, 14, 20);

	const tableData = data.map((log) => [
		log.info,
		new Date(log.createdAt).toLocaleDateString(),
	]);

	autoTable(doc, {
		startY: 30, 
		head: [["Info", "Created At"]],
		body: tableData,
		theme: "grid",
	});

	doc.save(`${title}.pdf`);
};