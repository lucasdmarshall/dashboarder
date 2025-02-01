import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/auth-context";
import InstructorProvider from "./context/instructor-context";
import { StudentContextProvider } from "./context/student-context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <InstructorProvider>
          <StudentContextProvider>
            <App />
            <ToastContainer />
          </StudentContextProvider>
        </InstructorProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
