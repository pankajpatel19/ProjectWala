import { BrowserRouter, Route, Routes } from "react-router-dom";
import Mainlayout from "./layouts/Mainlayout";
import Project from "./pages/Projects/project";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Mainlayout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/projects" element={<Project />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
