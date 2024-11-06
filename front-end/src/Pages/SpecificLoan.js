import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
 
function SpecificLoan() {
  
  const [loan, getLoan] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:8080/loans", {method:"GET"})
    .then(res => res.json())
    .then(res=> {getLoan(res);})
  },[])

  const navigate = useNavigate();

  
  return (
    <div>
      <Header/>
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
              <h1>$########</h1>
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
              <h2>Original Amount: $####.##</h2>
              <h2>Date Taken Out: ##/##/####</h2>
              <h2>Interest Rate: ##.#%</h2>
              <h2>Automatic Payments: ###</h2>
              <h2>Pays on: ######</h2>  
            </Col>
            <Col md={{ span: 5, offset: 2}}>
              <h2 style={{ textAlign: 'right'}}>Account ID: ###</h2>
              <h2 style={{ textAlign: 'right'}}>Full Name: ###### #####</h2>
              <h2 style={{ textAlign: 'right'}}>Phone Number: ###-###-####</h2>
              <h2 style={{ textAlign: 'right'}}>Email: ######@####.###</h2>
              <h2 style={{ textAlign: 'right'}}>Account Number: #######</h2>
            </Col>
          </Row>
        </Stack>  
      </Container>
        
    </div>
  );
}


export default SpecificLoan;