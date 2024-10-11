import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { Route, Router, Routes } from 'react-router-dom';
import Loan from './pages/Loan';
import Customer from './pages/Customer';




function App() {
  return (
      <div>
        <Header/>
        <Routes>
          <Route path="/loan" exact={true} element={<Loan/>}/>
          <Route path="/customer" exact={true} element={<Customer/>}/>
        </Routes>
      </div>
  );
}


export default App;