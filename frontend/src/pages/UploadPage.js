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
  " ": blankSpace,
};

function UploadPage() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [previewURL, setPreviewURL] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [wordsPerSecond, setWordsPerSecond] = useState(0);
  const [videoDuration, setVideoDuration] = useState(null);
  const videoRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setPreviewURL(URL.createObjectURL(selectedFile));

    // Create a temporary video element to get the duration
    const tempVideo = document.createElement("video");
    tempVideo.src = URL.createObjectURL(selectedFile);

    // Listen for the metadata load to get video duration
    tempVideo.onloadedmetadata = () => {
      const duration = tempVideo.duration;
      console.log("Video Duration:", duration);
      setVideoDuration(duration.toFixed(2)); // Store the duration in state
    };
  };

  const handleUpload = async (event) => {
    setResponseText(null);
    event.preventDefault();

    if (!file) {
      alert("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("video", file);

    setUploading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload-video",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setResponseText(response.data.text);
      setPreviewURL(URL.createObjectURL(file));
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Failed to upload video.");
    } finally {
      setUploading(false);
    }
  };

  function startASLDisplay() {
    const wordArray = responseText.trim().split(/\s+/);
    const totalWords = responseText.split(" ").length;
    const calculatedWordsPerSecond = totalWords / videoDuration;
    setWordsPerSecond(calculatedWordsPerSecond);

    wordArray.forEach((word, index) => {
      const aslImagesForWord = word
        .toLowerCase()
        .split("")
        .map((letter) => aslImages[letter] || blankSpace);

      setTimeout(() => {
        displayImagesSideBySide(aslImagesForWord);
      }, index * (videoDuration / totalWords) * 1000);
    });
  }

  function displayImagesSideBySide(imagesArray) {
    const container = document.getElementById("asl-container");
    if (!container) {
      console.error("Container element with ID 'asl-container' not found.");
      return;
    }
    container.innerHTML = "";

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
        {uploading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <h1>Uploading... Please wait.</h1>
          </div>
        ) : (
          <div className="uploadblock">
            <h3>Upload</h3>
            <div className="small-box">
              <input
                type="file"
                accept="video/mp4"
                onChange={handleFileChange}
              />
            </div>
            <button onClick={handleUpload}>Upload</button>
          </div>
        )}

        {responseText && videoDuration && (
          <div className="response-block">
            <h3>Response</h3>
            <div className="video-container">
              {previewURL && (
                <video
                  ref={videoRef}
                  src={previewURL}
                  controls
                  onPlay={() => {
                    if (responseText) {
                      startASLDisplay();
                    }
                  }}
                />
              )}
            </div>
          </div>
        )}

        <div id="asl-container" className="asl-container"></div>

        {/* <div className="sentence-input">
          <h3>Enter Sentence:</h3>
          <input
            type="text"
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
            placeholder="Type your sentence here"
          />
        </div> */}

        <div className="words-per-second">
          <p>Words per second: {wordsPerSecond.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default UploadPage;
