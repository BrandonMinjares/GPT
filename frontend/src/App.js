import React from 'react';
import {Route, HashRouter, Routes} from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={
          <Dashboard></Dashboard>
        }>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
