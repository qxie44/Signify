import React from 'react';
import { Link } from 'react-router-dom';
import './UploadPage.css';
import Navbar from '../components/Navbar';


function UploadPage() {
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
        <button> Save </button>
        <button> Share </button>
        </div>
      </div>
      </div>
    </div>
  );
}

export default UploadPage;
