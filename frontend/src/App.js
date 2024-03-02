import "./App.css";
import AdminSignup from "./components/admin/AdminSignup";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/navbar/NavBar";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import AdminSignIn from "./components/admin/AdminSignIn";
import AdminDashBoard from "./components/admin/AdminDashBoard";
function App() {
  return (
    <div className="App">
      <NavBar />
      <ToastContainer position="bottom-right" autoClose={5000} />
      <Routes>
        <Route path="/signup" element={<AdminSignup />}></Route>
        <Route path="/signin" element={<AdminSignIn />}></Route>
        <Route path="/admindashboard" element={<AdminDashBoard />}></Route>
      </Routes>
    </div>
  );
}

export default App;
