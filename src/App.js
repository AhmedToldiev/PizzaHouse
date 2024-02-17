import React, { useState } from 'react';
import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Card from './pages/Card';

function App() {
  const [search, setSearch] = useState('');
  // console.log(search, '----')
  return (
    <div className="wrapper">
      <Header search={search} setSearch={setSearch} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home search={search}  />} />
          <Route path="/card" element={<Card />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
