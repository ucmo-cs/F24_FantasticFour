//import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Loan from './pages/Loan';
import Customer from './pages/Customer';
import SaveLoan from "./pages/SaveLoan";




function App() {
  return (
      <div>
        <Header/>
        <Routes>
            <Route path="/loan" exact={true} element={<Loan/>}/>
            <Route path="/loanForm" exact={true} element={<SaveLoan/>}/>
            <Route path="/customer" exact={true} element={<Customer/>}/>
            
        </Routes>
      </div>
  );
}


export default App;