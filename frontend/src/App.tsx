import { useState } from 'react'
import { Link, Route, Routes, Router, BrowserRouter } from "react-router-dom";
import { Home,SignUp } from './Components';
import StartGame from './StartGame';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <div className="menu">
            <Link className="nav-item" to="/">Home</Link>
            <Link className = "nav-item" to="/match">Match</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/match" element={<SignUp />} />
          <Route path="/start/:id" element={<StartGame />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
