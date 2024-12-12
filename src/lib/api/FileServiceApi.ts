import { FILEUPLOAD_API_BASE_URL, FILEUPLOAD_API_KEY } from "@/lib/utils";

export async function uploadFile(file: File) {
  try {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "application/pdf", // PDF
      "application/vnd.ms-excel", // Older Excel format
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Modern Excel format
      "application/msword", // MS Word (.doc)
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // MS Word (.docx)
      "text/plain", // Plain text (.txt)
    ];

    const maxSize = 5 * 1024 * 1024; // 5 MB in bytes

    if (!allowedTypes.includes(file.type)) {
      throw new Error("Invalid file type.");
    }

    if (file.size > maxSize) {
      throw new Error("Exceeds 5MB limit.");
    }

    // Create a FormData object to append the file
    const formData = new FormData();
    formData.append('files', file);
    formData.append("replace", "true");

    // Send the file to the upload endpoint
    const response = await fetch(`${FILEUPLOAD_API_BASE_URL}/bucket/upload`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${FILEUPLOAD_API_KEY}`, 
    },
      body: formData,
    });
    
    if (!response.ok) {
      let errorMsg = response.statusText;
      if(response.status === 401) {
        errorMsg = "Unauthorized";
      } else {
        errorMsg = "Internal Server Error";
      }

      throw new Error(`File upload failed: ${errorMsg}`);
    }

    const data = await response.json(); // Assuming the response is JSON
    return data
    
  } catch (error) {
    return { errors: [{ detail: (error as Error).message }] };
  }
}