import React, { useRef, useState } from "react";
import axios from "axios";
import "./UploadPage.css";
import Navbar from "../components/Navbar";
import aslA from "./alphabet/a.jpeg";
import aslB from "./alphabet/b.jpeg";
import aslC from "./alphabet/c.jpeg";
import aslD from "./alphabet/d.jpeg";
import aslE from "./alphabet/e.jpeg";
import aslF from "./alphabet/f.jpeg";
import aslG from "./alphabet/g.jpeg";
import aslH from "./alphabet/h.jpeg";
import aslI from "./alphabet/i.jpeg";
import aslJ from "./alphabet/j.jpeg";
import aslK from "./alphabet/k.jpeg";
import aslL from "./alphabet/L.jpeg";
import aslM from "./alphabet/m.jpeg";
import aslN from "./alphabet/n.jpeg";
import aslO from "./alphabet/o.jpeg";
import aslP from "./alphabet/p.jpeg";
import aslQ from "./alphabet/q.jpeg";
import aslR from "./alphabet/r.jpeg";
import aslS from "./alphabet/s.jpeg";
import aslT from "./alphabet/t.jpeg";
import aslU from "./alphabet/u.jpeg";
import aslV from "./alphabet/v.jpeg";
import aslW from "./alphabet/w.jpeg";
import aslX from "./alphabet/x.jpeg";
import aslY from "./alphabet/y.jpeg";
import aslZ from "./alphabet/z.jpeg";
import blankSpace from "./alphabet/space.jpg";

const aslImages = {
  a: aslA,
  b: aslB,
  c: aslC,
  d: aslD,
  e: aslE,
  f: aslF,
  g: aslG,
  h: aslH,
  i: aslI,
  j: aslJ,
  k: aslK,
  l: aslL,
  m: aslM,
  n: aslN,
  o: aslO,
  p: aslP,
  q: aslQ,
  r: aslR,
  s: aslS,
  t: aslT,
  u: aslU,
  v: aslV,
  w: aslW,
  x: aslX,
  y: aslY,
  z: aslZ,
  " ": blankSpace, // Add handling for spaces
};

function UploadPage() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [responseText, setResponseText] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [inputText, setInputText] = useState(""); // State for the user input sentence

  const [videoDuration, setVideoDuration] = useState(null);
  const videoRef = useRef(null); // Ref to control the video element

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setPreviewURL(URL.createObjectURL(selectedFile)); // Generate preview URL
  };

  const handleUpload = async (event) => {
    setResponseText(null); // Clear previous response
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
      setResponseText(response.data.text); // Display server response

      // Set video URL for playback after upload completes
      setPreviewURL(URL.createObjectURL(file));
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Failed to upload video.");
    } finally {
      setUploading(false);
    }
  };

  function startASLDisplay() {
    const aslImagesForSentence = inputText
      .toLowerCase()
      .split("")
      .map((letter) => aslImages[letter] || blankSpace);

    displayImagesSideBySide(aslImagesForSentence);
  }

  function displayImagesSideBySide(imagesArray) {
    const container = document.getElementById("asl-container");
    if (!container) {
      console.error("Container element with ID 'asl-container' not found.");
      return;
    }
    container.innerHTML = ""; // Clear previous images

    imagesArray.forEach((imageSrc) => {
      const imgElement = document.createElement("img");
      imgElement.src = imageSrc;
      if (imageSrc === blankSpace) {
        imgElement.classList.add("space-image");
      }
      container.appendChild(imgElement);
    });
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

        <div id="asl-container" className="asl-container"></div>

        {responseText && (
          <div className="response-block">
            <h3>Response</h3>

            <div className="video-container">
              {previewURL && (
                <div>
                  <video
                    ref={videoRef}
                    src={previewURL}
                    controls
                    onLoadedMetadata={() => {
                      const duration = videoRef.current.duration;
                      setVideoDuration(duration.toFixed(2)); // Set duration with 2 decimal points
                    }}
                  />
                  {/* <p>
                      Video Length:{" "}
                      {videoDuration
                        ? `${videoDuration} seconds`
                        : "Loading..."}
                    </p> */}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Input for sentence */}
        <div className="sentence-input">
          <h3>Enter Sentence:</h3>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your sentence here"
          />
          <button onClick={startASLDisplay}>Print</button>
        </div>
      </div>
    </div>
  );
}

export default UploadPage;
