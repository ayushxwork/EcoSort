import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { installGlobalUiAudio } from './services/uiAudio';
import './index.css';

// Unlock audio on first gesture and play soft clicks on every UI button
installGlobalUiAudio();

// Block iOS pinch-zoom / smart-gesture page zoom (canvas draws its own gestures)
(['gesturestart', 'gesturechange', 'gestureend'] as string[]).forEach((type) => {
  document.addEventListener(type, (e) => e.preventDefault());
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
