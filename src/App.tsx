import React from 'react';

import './scss/app.scss';

import {Home} from './pages/Home';
import {Route, Routes } from 'react-router-dom';
import {NotFound} from './pages/NotFound';
import {Card} from './pages/Card';

import {Layout} from './Layout';
import { FullPizza } from './pages/FullPizza';


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="card" element={<Card />} />
      <Route path="/pizza/:id" element={<FullPizza />} />
      <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
