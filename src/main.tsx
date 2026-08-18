import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <App />
  </HashRouter>,
);

/* The static skeleton index.html paints while this bundle is still downloading.
   It lives OUTSIDE #root on purpose — see the note there — so React will never
   replace it and it has to be taken away by hand. */
document.getElementById('boot-shell')?.remove();
