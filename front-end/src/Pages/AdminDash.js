import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";

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

  const handleRowClick = (loanId) => {
    if (loanId) {
      navigate(`/loan/${loanId}`);
    }
  };

  return (
      <>
        <Header />
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: 'indianred',
      padding: '2rem'
    }}>
      <Container 
        className="d-flex justify-content-center"
        
        style={{
          
          maxWidth: '1400px',
          margin: '0 auto'
        }}
      >
        <Card className="shadow w-100" style={{
          backgroundColor: '#d4d4d4',
          borderRadius: '30px'

        }}>
          <Card.Header className="bg-success text-white d-flex justify-content-between align-items-center py-3">
            <h2 className="mb-0">Loan Management Dashboard</h2>
            <div >
              <Button 
                variant="light" 
                className="me-2"
                onClick={() => navigate('/loancreator')}
              >
                Create New Loan
              </Button>
            </div>
          </Card.Header>

          <Card.Body className="p-4">
            {error && <div className="alert alert-danger" >{error}</div>}

            <div className="table-responsive" style={{
              backgroundColor: '#a3a3a3'
            }}>
              <Table 
                striped 
                bordered 
                hover 
                className="mb-0 align-middle"
              >
                <thead className="bg-light">
                  <tr>
                    <th className="text-center py-3">Date Created</th>
                    <th className="text-center py-3">Customer Name</th>
                    <th className="text-center py-3">Original Amount</th>
                    <th className="text-center py-3">Amount Owed</th>
                    <th className="text-center py-3">Interest Rate</th>

                  </tr>
                </thead>
                <tbody>
                  {loans.map(loan => (
                    <tr 
                      key={loan.loanid} 
                      onClick={() => handleRowClick(loan.loanid)}
                      style={{ cursor: 'pointer' }}
                      className="hover-highlight"
                    >
                      <td className="text-center py-3">{formatDate(loan.created_at)}</td>
                      <td className="text-center py-3">{loan.useraccount?.userName}</td>
                      <td className="text-center py-3">{formatCurrency(loan.loan_origin_amount)}</td>
                      <td className="text-center py-3">{formatCurrency(loan.amountOwed)}</td>
                      <td className="text-center py-3">{loan.interest_rate}%</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
        </>
  );
}

export default AdminDash;