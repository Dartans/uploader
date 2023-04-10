document.getElementById("upload-button").addEventListener("click", async () => {
  const fileInput = document.getElementById("file-input");
  const files = fileInput.files;
  const comment = document.getElementById("comment").value;

  if (!files.length) {
    alert("Please select at least one file to upload");
    return;
  }

  // Create a FormData object to store the files, the URL, and the comment
  const formData = new FormData();
  for (const file of files) {
    formData.append("files", file);
  }
  formData.append("url", window.location.href);
  formData.append("comment", comment);

  // Define the API endpoint
  const apiEndpoint = "http://localhost:5000/api/upload";

  try {
    // Upload the files to the RESTful API endpoint
    const response = await fetch(apiEndpoint, {
      method: "POST",
      body: formData
    });

    // Check if the upload was successful
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      alert("Files uploaded successfully");
    } else {
      const error = await response.json();
      throw new Error(`HTTP error ${response.status}: ${error.error}`);
    }
  } catch (error) {
    console.error(error);
    alert("Failed to upload the files: " + error.message);
  }
});
