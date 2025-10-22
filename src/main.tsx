import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

/**
 * Renders the React application into the DOM.
 */
createRoot(document.getElementById("root")!).render(<App />);
