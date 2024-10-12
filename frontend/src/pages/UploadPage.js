import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./UploadPage.css";
import Navbar from "../components/Navbar";

function UploadPage() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [responseText, setResponseText] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!file) {
      console.error("No file selected.");
      alert("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("video", file);

    setUploading(true);
    setResponseText(null); // Clear previous response

    try {
      console.log("Uploading video...");
      const response = await axios.post(
        "http://localhost:5000/upload-video",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response from server:", response.data);
      setResponseText(response.data.text); // Display the "text" from response
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Failed to upload video.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="UploadPage">
      <Navbar /> {/* Navbar Component */}
      <div className="header"></div>
      <div className="container">
        <div className="uploadblock">
          <h3>Upload Video</h3>
          <div className="small-box">
            <input type="file" accept="video/mp4" onChange={handleFileChange} />
          </div>
          <button onClick={handleUpload} disabled={uploading}>
            {uploading ? (
              <div className="spinner"></div> // Spinner shown here
            ) : (
              "Upload"
            )}
          </button>
        </div>

        {responseText && (
          <div className="response-block">
            <h3>Response</h3>
            <div className="small-box">
              <p>{responseText}</p> {/* Display the response text */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadPage;
