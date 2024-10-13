import React, { useState } from "react";
import axios from "axios";
import "./UploadPage.css";
import Navbar from "../components/Navbar";
/*import asl1 from "./asl1.jpeg";
import asl2 from "./asl2.jpeg";
import asl3 from "./asl3.jpeg"; */
import a from "./alphabet/a.jpg";
import b from "./b.jpg";
import c from "./c.jpg";
import d from "./d.jpg";
import e from "./e.jpg";
import f from "./f.jpg";
import g from "./g.jpg";
import h from "./h.jpg";
import i from "./i.jpg";
import j from "./j.jpg";
import k from "./k.jpg";
import l from "./l.jpg";
import m from "./m.jpg";
import n from "./n.jpg";
import o from "./o.jpg";
import p from "./p.jpg";
import q from "./q.jpg";
import r from "./r.jpg";
import s from "./s.jpg";
import t from "./t.jpg";
import u from "./u.jpg";
import v from "./v.jpg";
import w from "./w.jpg";
import x from "./x.jpg";
import y from "./y.jpg";
import z from "./z.jpg";

function UploadPage() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [responseText, setResponseText] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setPreviewURL(URL.createObjectURL(selectedFile)); // Generate preview URL
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!file) {
      alert("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("video", file);

    setUploading(true);
    setResponseText(null); // Clear previous response

    try {
      const response = await axios.post(
        "http://localhost:5000/upload-video",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setResponseText(response.data.text); // Display the server response
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Failed to upload video.");
    } finally {
      setUploading(false);
    }
  };

  function startASLDisplay() {
    const aslImages = [asl1, asl2, asl3];
    const totalDisplayTime = 2; // Total time in seconds to display the images
    displayImagesOverTime(aslImages, totalDisplayTime);
  }

  function displayImagesOverTime(imagesArray, totalTime) {
    const container = document.getElementById("asl-container");
    const imageCount = imagesArray.length;
    const displayTime = totalTime / imageCount; // Time per image (in seconds)

    let currentIndex = 0;

    function showNextImage() {
      if (currentIndex >= imageCount) return; // Stop when all images are shown

      container.innerHTML = ""; // Clear previous image
      const imgElement = document.createElement("img");
      imgElement.src = imagesArray[currentIndex];
      imgElement.alt = `ASL image ${currentIndex + 1}`;
      container.appendChild(imgElement);

      currentIndex++;
      setTimeout(showNextImage, displayTime * 1000); // Convert to ms
    }

    showNextImage(); // Start displaying the first image
  }

  return (
    <div className="UploadPage">
      <Navbar />
      <div className="header"></div>
      <div className="container">
        <div className="uploadblock">
          <h3>Upload</h3>
          <div className="small-box">
            <input type="file" accept="video/mp4" onChange={handleFileChange} />
          </div>
          <button onClick={handleUpload} disabled={uploading}>
            {uploading ? <div className="spinner"></div> : "Upload"}
          </button>
        </div>

        {/* <div className="previewblock">
          <h3>Preview</h3>
          <div className="small-box">
            {previewURL ? (
              <video src={previewURL} controls width="100%" />
            ) : (
              "Preview file here"
            )}
          </div>
          <button onClick={startASLDisplay}>Upload & Display ASL</button>
        </div> */}

        <div id="asl-container" className="asl-container"></div>

        {responseText && (
          <div className="response-block">
            <h3>Response</h3>
            <div className="small-box">
              <p>{responseText}</p>
            </div>
            <button onClick={startASLDisplay}>Upload & Display ASL</button>
          </div>
          
        )}
      </div>
    </div>
  );
}

export default UploadPage;
