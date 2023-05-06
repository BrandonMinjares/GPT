import React from 'react';
import {Route, HashRouter, Routes} from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import Room from './components/Room';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Dashboard></Dashboard>}></Route>
        <Route path="/game" element={<Room></Room>}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
