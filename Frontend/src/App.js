import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css';
import Register from './Register';
import Login from './Login'
import Dashboard from "./Dashboard";
import EmpolyeeRecord from "./EmpolyeeRecord";
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/Register' element={<Register/>}/>
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path="/EmployeeRecord" element={<EmpolyeeRecord/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
