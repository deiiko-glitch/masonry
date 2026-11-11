// Ensure window.fetch has a setter if an extension tries to monkey-patch it
try {
  const origFetch = window.fetch;
  let activeFetch = typeof origFetch === 'function' ? origFetch.bind(window) : origFetch;
  Object.defineProperty(window, 'fetch', {
    configurable: true,
    enumerable: true,
    get: () => activeFetch,
    set: (fn) => { activeFetch = fn; },
  });
} catch (_) {
  // Ignore if already configured
}

import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
