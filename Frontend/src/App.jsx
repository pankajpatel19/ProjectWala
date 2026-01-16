import { BrowserRouter, Route, Routes } from "react-router-dom";
import Mainlayout from "./layouts/Mainlayout";
import Project from "./pages/Projects/project";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import ProtectedRoute from "./routes/ProtectedRoute";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Mainlayout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/projects" element={<Project />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
