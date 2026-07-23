import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import App from "./App.tsx";
import { captureAttribution } from "./lib/attribution";
import "./index.css";

captureAttribution();

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Analytics />
  </>
);
