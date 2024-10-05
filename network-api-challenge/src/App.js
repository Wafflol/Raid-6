import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Signup } from './pages/Signup';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" />
          <Route path="/signup" Component={Signup}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
