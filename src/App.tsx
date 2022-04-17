import React from "react";
import { useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext"; 
import { routes } from "./routes";

function App() {
  const renderedRoutes = useRoutes(routes);

  return (
    <AuthProvider>
      {renderedRoutes}
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
