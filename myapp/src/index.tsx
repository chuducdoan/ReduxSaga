import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import Providers from 'Providers';
import { BackToTop, Loading } from 'components';

const container = document.getElementById('root')!;
const root = createRoot(container);

const getLoading = () => {
  return <Loading />;
};

root.render(
  <React.StrictMode>
    <Providers>
      <Suspense fallback={getLoading()}>
        <App />
        <BackToTop />
      </Suspense>
    </Providers>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
