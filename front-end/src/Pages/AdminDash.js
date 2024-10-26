import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import '../App.css';
 
function AdminDash() {
  
  const [loans, setLoans] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:8080/loans", {method:"GET"})
    .then(res => res.json())
    .then(res=> {setLoans(res);})
  },[])

  const navigate = useNavigate();


  const moveToLoanCreator = () => {
    navigate("/loancreator");  
  };

  const moveToSpecificLoan = () => {
    navigate("/specificloan")
  };

  
  return (
    <div>
      <Header/>
        <h1>Welcome Admin!</h1>
        <Button variant='success' onClick={moveToLoanCreator}>Create</Button>
        <div className='box'>
          <Table striped bordered hover >
          <thead>
              <tr>
              <th>#</th>
              <th>Loan Original Amount</th>
              <th>Interest Rate</th>
              <th>Loan Created On</th>
              <th>User</th>
              </tr>
          </thead>
          <tbody>
          {loans.map(loan =>
              <tr>
              <td><Button variant='link' onClick={moveToSpecificLoan}>{loan.user_account.userId}-{loan.loan_id}</Button></td>
              <td>{loan.loan_origin_amount}</td>
              <td>{loan.interest_rate}%</td>
              <td>{loan.created_at}</td>
              <td>{loan.user_account.userName}</td>
              </tr>
          )}    
          </tbody>
          </Table>
        </div>
        
    </div>
  );
}


export default AdminDash;