import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"; // Import the HomePage
import UploadPage from "./pages/UploadPage"; // Import the UploadPage
import './App.css'; // Import styles

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Home Page */}
          <Route path="/upload" element={<UploadPage />} /> {/* Upload Page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
