import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Signup } from './pages/LoginSignup/Signup';
import { Login } from './pages/LoginSignup/Login'
import { Switch } from './pages/Switch'
import { OTP } from './pages/LoginSignup/OTP'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" Component={Switch}/>
          <Route path="/signup" Component={Signup}/>
          <Route path='/login' Component={Login} />
          <Route path='/OTP' Component={OTP}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
