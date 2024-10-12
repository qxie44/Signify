import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import Navbar from '../components/Navbar';
import logo from '../components/signify-logo.png'
import sportsCommentaryImage from './sports-com.jpg'; 
import arch from "./ganarch.png";
import hands from "./hands.jpg";

function HomePage() {
  return (
    <div className="HomePage">
    <Navbar /> {/* Add Navbar here */}
      <header className="App-header">
        <h1> Bridging the Gap in Communication</h1>
      </header>

      <section className="preview-section">
        <div className="video-preview">
          <p>Show a preview/example video</p>
        </div>
        <div className="description">
        <h2>Our Mission</h2>
          <p>
          With 466 million deaf individuals worldwide, and 50% of deaf sports fans 
          feeling that sports streaming services are currently not designed for their community, 
          the deaf sports community needs a better, more accessible way to enjoy their entertainment. 
          We tackle the limitations of modern sports providers by offering an AI translator for a dozen 
          varieties of sign language, enabling all to enjoy whichever sport they love most. Check out our 
          product below to see how we are literally changing the game:
          </p>
          <Link to="/upload">
            <button>Try it now!</button>
          </Link>
        </div>
      </section>
      <section className="technology">
      <h2>Our Technology</h2>
      <p2>We convert text transcribed from the audio of your favorite sports videos to 
        train a Generative Adversarial Network (GAN) to translate any spoken language into a sign 
        language of your choice!</p2>
        <div className="technology-containers">
        <div className="tech-container"><p>Sports Commentary</p>
        <img src={sportsCommentaryImage}  className="tech-image" />
        </div>
        <div className="tech-container"><p>GAN Architecture</p>
        <img src={arch} className="tech-image" />
        </div>
        <div className="tech-container"><p>Virtual Sign 
        Language Interpreter</p>
        <img src={hands} className="tech-image" />
        </div>
      </div>
      </section>

      <section className="team-section">
        <h2>Meet the team</h2>
        <div className="team-members">
          <div className="team-member">
            <div className="profile"></div>
            <p>Hui</p>
          </div>
          <div className="team-member">
            <div className="profile"></div>
            <p>Scott</p>
          </div>
          <div className="team-member">
            <div className="profile"></div>
            <p>Kartik</p>
          </div>
          <div className="team-member">
            <div className="profile"></div>
            <p>Rayyan</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
