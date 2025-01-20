// utils/uploadToIPFS.js
export const uploadToIPFS = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await fetch("http://127.0.0.1:5001/api/v0/add", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Failed to upload to IPFS: Network response was not ok");
      }
  
      const data = await response.json();
      console.log("File uploaded to IPFS:", data);
      return data.Hash; 
    } catch (error) {
      console.error("Error uploading to IPFS:", error);
      throw error;
    }
  };
  