
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './App.css'

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Root element not found");
} else {
  createRoot(rootElement).render(<App />);
}
