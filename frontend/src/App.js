import React from 'react';
import {Route, HashRouter, Routes} from 'react-router-dom';
import './App.css';
import Room from './components/Room';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Room></Room>}></Route>
        <Route path="*" element={<Room></Room>}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
