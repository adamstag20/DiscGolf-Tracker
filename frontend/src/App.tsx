import { useState } from 'react'
import { Link, Route, Routes, Router, BrowserRouter } from "react-router-dom";
import { Home, AuthPage } from './Components';
import StartGame from './StartGame';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/App.css'
import './styles/Auth.css'
import { useEffect } from 'react';

function App() {
  const [token, setToken] = useState(sessionStorage.getItem('items') || '');

  useEffect(() => {
      console.log(sessionStorage.getItem('items'));

      const items = JSON.parse(sessionStorage.getItem('items'));
      if (items) {
          setToken(items);
      }
      else {
          sessionStorage.setItem('items', JSON.stringify(token));
      }
  }, [token]);

  return (
    <div>
    { !token ? (
        <AuthPage 
         setUser = {setToken}/>
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
          <Route path="/match" />
          <Route path="/start/:id" element={<StartGame />} />
        </Routes>

      </div>
    </BrowserRouter>
    )}
  </div>
  );
}

export default App;
