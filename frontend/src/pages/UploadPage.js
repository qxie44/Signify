import React from 'react';
import { Link } from 'react-router-dom';
import './UploadPage.css';
import Navbar from '../components/Navbar';
import asl1 from './asl1.jpeg';
import asl2 from './asl2.jpeg';
import asl3 from './asl3.jpeg';




function UploadPage() {
  
  function startASLDisplay() {
    const aslImages = [asl1, asl2, asl3];
    const totalDisplayTime = 2; // Total time in seconds to display the images

    // Call the function to display the images
    displayImagesOverTime(aslImages, totalDisplayTime);
  }
  function displayImagesOverTime(imagesArray, totalTime) {
    const container = document.getElementById('asl-container');
    const imageCount = imagesArray.length;
    const displayTime = totalTime / imageCount; // Time per image (in seconds)

    let currentIndex = 0;

    function showNextImage() {
      if (currentIndex >= imageCount) {
        return; // Stop when all images are shown
      }

      // Clear the previous image
      container.innerHTML = '';

      // Create a new image element
      const imgElement = document.createElement('img');
      imgElement.src = imagesArray[currentIndex];
      imgElement.alt = `ASL image ${currentIndex + 1}`;

      // Append the image to the container
      container.appendChild(imgElement);

      // Move to the next image after displayTime
      currentIndex++;
      setTimeout(showNextImage, displayTime * 1000); // Convert to ms
    }

    showNextImage(); // Start displaying the first image

  }
  return (
    <div className='UploadPage'>
      <Navbar /> {/* Add Navbar here */} 
      <div className='header'>
      </div>
      <div className="container">
      <div className='uploadblock'>
        <h3>Upload</h3>
        <div className="small-box">upload file here</div>
        <button> Upload </button>
      </div>
      <div className='previewblock'>
        <h3>Preview</h3>
        <div className='previewblock'>
        <div className="small-box">preview file here</div>
        <button onClick={startASLDisplay}>Upload & Display ASL</button> 
        </div>
      </div>
      
      <div id="asl-container" className="asl-container"></div>
      </div>
    </div>
  );
}

export default UploadPage;
