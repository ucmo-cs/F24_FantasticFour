import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import AdminDash from './pages/AdminDash';
import LoanCreator from './pages/LoanCreator'
import Login from './pages/Login'
import SpecificLoan from './pages/SpecificLoan';
import Customer from "./pages/Customer";

function App() {
  return (
    <div>
    <Routes>
      <Route path="/" exact={true} element={<Login/>}/>
      <Route path="/admindash" exact={true} element={<AdminDash/>}/>
      <Route path="/loancreator" exact={true} element={<LoanCreator/>}/>
      <Route path="/loan/:loanid" element={<SpecificLoan/>}/>
      <Route path="/customer" element={<Customer/>}/>
    </Routes>
  </div>
  );
}

export default App;
