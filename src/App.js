import React, { useState } from 'react';

import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Card from './pages/Card';

export const SearchContext = React.createContext('');

function App() {
  const [search, setSearch] = useState('');

  return (
    <div className="wrapper">
      
      <SearchContext.Provider value={{search,setSearch}}>
        <Header  />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home search={search} />} />
            <Route path="/card" element={<Card />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
