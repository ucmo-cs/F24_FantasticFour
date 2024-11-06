import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Stack } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
 
function SpecificLoan() {
  const params = useParams();

  const [loan, gettingLoan] = useState([]);

  useEffect(()=>{
    fetch(`http://localhost:8080/loan/${params.loanid}`, {method:"GET"})
    .then(res => res.json())
    .then(res=> {gettingLoan(res);})
  },[])

  const navigate = useNavigate();
  
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

  const moveToDash = () => {
    navigate("/admindash");  
  };

  return (
    <div>
      <Header/>
      <Button variant='success' onClick={moveToDash}>{"<-- Back"}</Button>  
      <Container>
        <Stack gap={4}>
          <Row></Row>
          <Row>
            <Col md={{ span: 5, offset: -1}}>
              <h2>Amount Due:</h2>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 5, offset: 1}}>
              <h1>{formatMoney(loan.loan_origin_amount)}</h1>
            </Col>
          </Row>
          <Row></Row>
          <Row></Row>
          <Row></Row>
          <Row></Row>
          <Row></Row>
          <Row></Row>
          <Row></Row>
          <Row>
            <Col md={{ span: 5, offset: -1}}>
              <div>
                <h2>Original Amount: {formatMoney(loan.loan_origin_amount)}</h2>
                <h2>Date Taken Out: {formatDate(loan.created_at)} {formatTime(loan.created_at)}</h2>
                <h2>Interest Rate: {loan.interest_rate}%</h2>
                <h2>Automatic Payments: {loan.automaticPayment}</h2>
                <h2>Pays on: {loan.automaticPayment}</h2>  
              </div>
              
            </Col>
            <Col md={{ span: 5, offset: 2}}>
              <div>
                <h2 style={{ textAlign: 'right'}}>Account ID: {loan?.user_account?.accountId}</h2>
                <h2 style={{ textAlign: 'right'}}>Full Name: {loan?.user_account?.userName}</h2>
                <h2 style={{ textAlign: 'right'}}>Phone Number: {loan?.user_account?.phoneNumber}</h2>
                <h2 style={{ textAlign: 'right'}}>Email: {loan?.user_account?.email}</h2>
                <h2 style={{ textAlign: 'right'}}>Account Number: {loan?.user_account?.bankAccount}</h2>
                <h2 style={{ textAlign: 'right'}}>Routing Number: {loan?.user_account?.bankRouting}</h2>
              </div>
              
            </Col>
          </Row>
        </Stack>  
      </Container>
        
    </div>
  );
}


export default SpecificLoan;