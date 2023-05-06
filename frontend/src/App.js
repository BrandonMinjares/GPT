import React from 'react';
import {Route, HashRouter, Routes} from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import { ChakraProvider } from '@chakra-ui/react';
import Room from './components/Room';

function App() {
  return (
    <HashRouter>
      <ChakraProvider>
      <Routes>
        <Route path="/" element={<Dashboard></Dashboard>}></Route>
        <Route path="/game" element={<Room></Room>}></Route>
      </Routes>
      </ChakraProvider>
    </HashRouter>
  );
}

export default App;
