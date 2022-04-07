import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import './App.css';
import LoginForm from "./components/LoginForm";
import PatientDetails from "./components/PatientDetail";
import PatientList from "./components/PatientList";

function App() {

  const logout=()=> {
    localStorage.clear();
    window.location.href = "http://localhost:3000/";
  }

  return (
    <div className="App">
      <h3>Patient Portal</h3>
      <a href="#" onClick={() => logout()}><h4>Log Out</h4> </a>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginForm />}> </Route>
          <Route path="/patientlist" element={<PatientList />}></Route>
          <Route path="/patientdetails" element={<PatientDetails />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

