import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Signup } from './pages/LoginSignup/Signup';
import { Viewer } from './pages/Docs/DocumentViewer';
import { Login } from './pages/LoginSignup/Login'
import { Switch } from './pages/Switch'
import { OTP } from './pages/LoginSignup/OTP'


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signup" Component={Signup}/>
          <Route path="/viewer" element={<Viewer pdfUrl={"https://www.mta.ca/~rrosebru/oldcourse/263114/Dsa.pdf"}/>}/>
          <Route path='/' Component={Login} />
          <Route path="/home/*" Component={Switch}/>
          <Route path='/OTP' Component={OTP}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;