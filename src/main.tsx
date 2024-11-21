import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProviderWrapper } from "./styles/themeContext";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProviderWrapper>
      <RouterProvider router={router} />
    </ThemeProviderWrapper>
  </React.StrictMode>
);
