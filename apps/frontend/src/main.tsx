import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.scss";

async function iniciarMocks() {
  if (!import.meta.env.DEV || import.meta.env.VITE_USE_MOCKS === "false") {
    return;
  }

  const { worker } = await import("./mocks/browser");
  await worker.start({ onUnhandledRequest: "bypass" });
}

iniciarMocks().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});

