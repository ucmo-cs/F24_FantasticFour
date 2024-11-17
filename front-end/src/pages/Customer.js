import React, {useEffect, useState} from 'react';
import {Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {Button} from 'react-bootstrap/Button';
import Header from '../components/Header';
import '../App.css';
 
function Customer() {

    const [loans, setLoans] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:8080/loans", {method:"GET"})
            .then(res => res.json())
            .then(res=> {setLoans(res);})
    },[])

    const navigate = useNavigate();
    
    const moveToEditCustomer = () => {
    navigate("/EditCustomer");  
  };
    
  return (


   <><div>
      <Header />
      <h1>Welcome Customer!</h1>
      <div>
        <Row>
          <Col md={9} className='mx-auto'>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Amount Due</th>
                  <th>Original Amount</th>
                  <th>Date Started</th>
                  <th>Interest Rate</th>
                  <th>Date paid in full</th>
                </tr>
              </thead>
              <tbody>

                {loans.map(loan => <tr>
                  <td>{loan.user_account.userName}</td>
                  <td>amount due</td>
                  <td>{loan.loan_origin_amount}</td>
                  <td>{loan.created_at}</td>
                  <td>{loan.interest_rate}</td>
                  <td>date paid in full</td>
                </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    </div>
    <div>
        <Header />
        <h2>Personal Info:</h2>
        <Button variant='success' onClick={moveToEditCustomer}>Edit</Button>
        <div>

          <Row>
            <Col md={9} className='mx-auto'>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th>Customer email</th>
                    <th>Customer phone</th>
                    <th>Customer Acc #</th>
                    <th>Customer Routing #</th>
                  </tr>
                </thead>
                <tbody>
                  {loans.map(loan => <tr>
                    <td>{loan.user_account.userName}</td>
                    <td>{loan.user_account.email}</td>
                    <td>{loan.user_account.phoneNumber}</td>
                    <td>{loan.user_account.bankAccount}</td>
                    <td>{loan.user_account.bankRouting}</td>
                  </tr>
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
        </div>
      </div></>
  );
}


export default Customer;
