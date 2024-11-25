import React, { useEffect, useState } from 'react';
import { Button, Container, Card, Table } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Logout from '../components/Logout';
import Header from '../components/Header';

function SpecificLoan() {
  const { loanid } = useParams();
  const [loan, setLoan] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loanid) {
      navigate('/admindash');
      return;
    }

    setLoading(true);
    fetch(`http://localhost:8080/loan/${loanid}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch loan details');
        return res.json();
      })
      .then(data => {
        setLoan(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [loanid, navigate]);

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    if (!amount) return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) return (
    <Container className="mt-4">
      <Card>
        <Card.Body className="text-center">
          <h3>Loading loan details...</h3>
        </Card.Body>
      </Card>
    </Container>
  );

  if (error) return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <div className="alert alert-danger">{error}</div>
          <Button variant="primary" onClick={() => navigate('/admindash')}>
            Back to Dashboard
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );

  if (!loan) return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <div className="alert alert-warning">Loan not found</div>
          <Button variant="primary" onClick={() => navigate('/admindash')}>
            Back to Dashboard
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );

  return (
      <>
        <Header />
    <div style={{ 
      minHeight: '100vh',

      padding: '2rem'
    }}>
      <Container 
        className="d-flex justify-content-center"
        style={{ maxWidth: '1200px' }}
      >
        <Card className="shadow w-100">
          <Card.Header className="bg-success text-white d-flex justify-content-between align-items-center py-3">
            <div>
              <Button 
                variant="light" 
                className="me-2"
                onClick={() => navigate('/admindash')}
              >
                Back to Dashboard
              </Button>
              <span className="ms-2">Loan Details #{loanid}</span>
            </div>
            <Logout />
          </Card.Header>

          <Card.Body className="p-4">
            <div className="text-center mb-4">
              <h3>Current Amount Due</h3>
              <h1 className="display-4">{formatCurrency(loan?.amountOwed)}</h1>
            </div>

            <div className="table-responsive">
              <Table bordered>
                <tbody>
                  <tr>
                    <th className="bg-light" width="25%">Original Amount</th>
                    <td>{formatCurrency(loan?.loan_origin_amount)}</td>
                    <th className="bg-light" width="25%">Customer Name</th>
                    <td>{loan?.useraccount?.userName || 'N/A'}</td>
                  </tr>
                  <tr>
                    <th className="bg-light">Date Taken Out</th>
                    <td>{formatDate(loan?.created_at)}</td>
                    <th className="bg-light">Phone Number</th>
                    <td>{loan?.useraccount?.phoneNumber || 'N/A'}</td>
                  </tr>
                  <tr>
                    <th className="bg-light">Interest Rate</th>
                    <td>{loan?.interest_rate}%</td>
                    <th className="bg-light">Email</th>
                    <td>{loan?.useraccount?.email || 'N/A'}</td>
                  </tr>
                  <tr>
                    <th className="bg-light">Automatic Payment</th>
                    <td>{loan?.automaticPayment > 0 ? formatCurrency(loan.automaticPayment) + '/month' : 'Not Set'}</td>
                    <th className="bg-light">Bank Account</th>
                    <td>••••{loan?.useraccount?.bankAccount?.slice(-4) || 'Not Set'}</td>
                  </tr>
                  <tr>
                    <th className="bg-light">Payment Date</th>
                    <td>{loan?.automaticPayment > 0 ? '1st of each month' : 'Not Set'}</td>
                    <th className="bg-light">Routing Number</th>
                    <td>••••{loan?.useraccount?.bankRouting?.slice(-4) || 'Not Set'}</td>
                  </tr>
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

export default SpecificLoan;