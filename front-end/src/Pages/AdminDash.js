import React, { useEffect, useState } from 'react';
import { Button, Table, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
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

  const formatDate = (timestamp) => {
    const options = {year: "numeric", month: "long", day:"numeric"}
    return new Date(timestamp).toLocaleDateString(undefined,options)
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US')
  }

  const formatMoney = (amount) => {
    const formattedAmount = parseFloat(amount).toLocaleString("en-US", {
      style:"currency",
      currency:"USD",
    });
    return formattedAmount
  }

  
  return (
    <div>
      <Header/>
        <h1>Welcome Admin!</h1>
        <Button variant='success' onClick={moveToLoanCreator}>Create</Button>
        <div>
          <Row>
            <Col md={9} className='mx-auto'> 
              <Table striped bordered hover >
              <thead>
                  <tr>
                  <th>User ID - Loan ID</th>
                  <th>Loan Original Amount</th>
                  <th>Interest Rate</th>
                  <th>Loan Created On</th>
                  <th>Username</th>
                  </tr>
              </thead>
              <tbody>
              {loans.map(loan =>
                  <tr>
                  <td><Button variant='link' onClick={moveToSpecificLoan}>{loan.user_account.userId}-{loan.loan_id}</Button></td>
                  <td>{formatMoney(loan.loan_origin_amount)}</td>
                  <td>{loan.interest_rate}%</td>
                  <td>{formatDate(loan.created_at)}, {formatTime(loan.created_at)}</td>
                  <td>{loan.user_account.userName}</td>
                  </tr>
              )}    
              </tbody>
              </Table>
            </Col>
          </Row>
          
          
        </div>
        
    </div>
  );
}


export default AdminDash;