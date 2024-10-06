import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Signup } from './pages/LoginSignup/Signup';
import { Login } from './pages/LoginSignup/Login';
import { Switch } from './pages/Switch';
import { Viewer } from './pages/Docs/DocumentViewer';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" Component={Switch}/>
          <Route path="/signup" Component={Signup}/>
          <Route path='/login' Component={Login} />
          <Route path="/viewer" Component={Viewer} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

{/*
// App.js
import React from 'react';
import PdfViewer from './PdfViewer';

const App = () => {
    const pdfUrl = ''; // URL to the PDF

    return (
        <div>
            <h1>PDF Viewer</h1>
            <PdfViewer pdfUrl={pdfUrl} />
        </div>
    );
};

export default App;
*/}