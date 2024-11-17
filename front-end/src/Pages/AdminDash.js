import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Logout from '../components/Logout';

function AdminDash() {
  const [loans, setLoans] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/loans")
      .then(res => res.json())
      .then(data => setLoans(data))
      .catch(err => setError("Failed to load loans"));
  }, []);

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Loan Management Dashboard</h2>
        <div>
          <Button 
            variant="primary" 
            className="me-2"
            onClick={() => navigate('/loancreator')}
          >
            Create New Loan
          </Button>
          <Logout />
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Date Created</th>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Original Amount</th>
            <th>Amount Owed</th>
            <th>Interest Rate</th>
            <th>Auto Payment</th>
          </tr>
        </thead>
        <tbody>
          {loans.map(loan => (
            <tr key={loan.loanid}>
              <td>{formatDate(loan.created_at)}</td>
              <td>{loan.useraccount.userName}</td>
              <td>{loan.useraccount.email}</td>
              <td>{loan.useraccount.phoneNumber}</td>
              <td>{formatCurrency(loan.loan_origin_amount)}</td>
              <td>{formatCurrency(loan.amountOwed)}</td>
              <td>{loan.interest_rate}%</td>
              <td>{loan.automaticPayment > 0 ? formatCurrency(loan.automaticPayment) + '/month' : 'Not Set'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default AdminDash;