import React from 'react';
import ReactDOM from 'react-dom/client';
import bridge from '@vkontakte/vk-bridge';
import App from './App';
import './index.css';

// Инициализируем VK Bridge
bridge.send("VKWebAppInit").then(data => {
  if (data.result) {
    console.log("VK Bridge initialized successfully");
  }
}).catch(error => {
  console.log("VK Bridge initialization skipped (not in VK environment)", error);
});

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);