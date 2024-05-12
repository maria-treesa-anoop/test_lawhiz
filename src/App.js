
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import KeywordComparison from './legal'; // Assuming the file containing KeywordComparison is named legal.js

function App() {
  return (
    <Router>
      <div>        
        <Routes>
           <Route path='/' element={<KeywordComparison/>}/> {/* Render KeywordComparison when path is /legal */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

