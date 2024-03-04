import React from 'react';
import { createRoot } from 'react-dom/client'; // Импорт createRoot из react-dom/client, а не react-dom
import App from './App'
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store';
import { Provider } from 'react-redux';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  
  root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
} else {
  console.error("Root element not found");
}


