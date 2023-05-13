import { useState } from 'react'
import { Link, Route, Routes, Router, BrowserRouter } from "react-router-dom";
import { Home, Match } from './Components';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <div className="menu">
            <Link className="nav-item" to="/">Home</Link>
            <Link className = "nav-itme" to="/match">Match</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/match" element={<Match />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
