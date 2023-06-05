import { useState } from 'react'
import { Link, Route, Routes, Router, BrowserRouter } from "react-router-dom";
import { Home, AuthPage } from './Components';
import StartGame from './StartGame';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/App.css'
import './styles/Auth.css'

function App() {
  const [authUser, setAuthUser] = useState(false)

  return (
    <div>
    { !authUser ? (
        <AuthPage/>
    ):(
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
          <Route path="/match" element={<AuthPage />} />
          <Route path="/start/:id" element={<StartGame />} />
        </Routes>

      </div>
    </BrowserRouter>
    )}
  </div>
  );
}

export default App;
