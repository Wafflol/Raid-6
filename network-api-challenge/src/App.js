import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Signup } from './pages/LoginSignup/Signup';
import { Login } from './pages/LoginSignup/Login'
import { Switch } from './pages/Switch'
import { OTP } from './pages/LoginSignup/OTP'
import { DocumentCentre } from './pages/DocumentCentre'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/login' Component={Login}/>
          <Route path="/signup" Component={Signup}/>
          <Route path='/OTP' Component={OTP}/>
          <Route path="/document-centre" component={DocumentCentre} />
          <Route path="/" elements={<Navigate replace to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
