import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import AdminDash from './Pages/AdminDash2';
import LoanCreator from './Pages/LoanCreator'
import Login from './Pages/Login'
import SpecificLoan from './Pages/SpecificLoan';

function App() {
  return (
    <div>
    <Routes>
      <Route path="/" exact={true} element={<Login/>}/>
      <Route path="/admindash" exact={true} element={<AdminDash/>}/>
      <Route path="/loancreator" exact={true} element={<LoanCreator/>}/>
      <Route path="/specificloan" exact={true} element={<SpecificLoan/>}/>
    </Routes>
  </div>
  );
}

export default App;
