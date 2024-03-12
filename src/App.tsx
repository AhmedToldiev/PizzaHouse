import React, { Suspense } from 'react';

import './scss/app.scss';

import { Home } from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';

const Card = React.lazy(() => import('./pages/Card'));
const FullPizza = React.lazy(() => import('./pages/FullPizza'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="card"
          element={
            <Suspense fallback={<div>Идет загрузка...</div>}>
              <Card />
            </Suspense>
          }
        />
        <Route
          path="/pizza/:id"
          element={
            <Suspense fallback={<div>Идет загрузка...</div>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Идет загрузка...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
