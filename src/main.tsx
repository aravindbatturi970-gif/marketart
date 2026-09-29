import { HashRouter } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* HashRouter keeps every route relative to index.html, so the app works
        identically at a domain root, under a GitHub Pages subpath
        (/username.github.io/repo/), or from a static file server. No build-
        time path configuration, no white-screen 404s on refresh. */}
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
);
