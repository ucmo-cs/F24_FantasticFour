import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Logout from "../components/Logout";

function Customer() {
  const navigate = useNavigate();
  const [loans, setLoans] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  
  // Form states for editable fields
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [bankRouting, setBankRouting] = useState('');

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (!userString) {
      navigate('/login');
      return;
    }

    const user = JSON.parse(userString);
    
    // Fetch loans for user
    fetch(`http://localhost:8080/loans/user/${user.userId}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch loans');
        return res.json();
      })
      .then(data => {
        setLoans(data);
        if (data && data.length > 0 && data[0].useraccount) {
          setSelectedLoan(data[0]);
          setUserName(data[0].useraccount.userName || '');
          setEmail(data[0].useraccount.email || '');
          setPhoneNumber(data[0].useraccount.phoneNumber || '');
          setBankAccount(data[0].useraccount.bankAccount || '');
          setBankRouting(data[0].useraccount.bankRouting || '');
        }
      })
      .catch(err => setError(err.message));
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`http://localhost:8080/account/${selectedLoan.useraccount.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName,
          email,
          phoneNumber,
          bankAccount,
          bankRouting
        })
      });

      if (!response.ok) throw new Error('Failed to update account details');
      
      setIsEditing(false);
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

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
    <Container className="mt-5">
      {error && <div className="alert alert-danger">{error}</div>}
      <Logout />
      <Row>
        <Col md={6}>
          {loans.map((loan, index) => (
            <Card key={loan.loanid} className="mb-4">
              <Card.Header>
                <h4>Loan {index + 1} Details</h4>
              </Card.Header>
              <Card.Body>
                <p><strong>Date Taken:</strong> {formatDate(loan.created_at)}</p>
                <p><strong>Amount Due:</strong> {formatCurrency(loan.amountOwed)}</p>
                <p><strong>Original Amount:</strong> {formatCurrency(loan.loan_origin_amount)}</p>
                <p><strong>Interest Rate:</strong> {loan.interest_rate}%</p>
                {loan.automaticPayment > 0 && (
                  <p><strong>Automatic Payment:</strong> {formatCurrency(loan.automaticPayment)}/month</p>
                )}
              </Card.Body>
            </Card>
          ))}
        </Col>

        <Col md={6}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h4>Personal Information</h4>
              <Button 
                variant={isEditing ? "secondary" : "primary"} 
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </Card.Header>
            <Card.Body>
              {isEditing ? (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Bank Account Number</Form.Label>
                    <Form.Control
                      type="text"
                      value={bankAccount}
                      onChange={(e) => setBankAccount(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Bank Routing Number</Form.Label>
                    <Form.Control
                      type="text"
                      value={bankRouting}
                      onChange={(e) => setBankRouting(e.target.value)}
                    />
                  </Form.Group>

                  <Button type="submit" variant="success">
                    Save Changes
                  </Button>
                </Form>
              ) : (
                <>
                  <p><strong>Name:</strong> {userName}</p>
                  <p><strong>Email:</strong> {email}</p>
                  <p><strong>Phone Number:</strong> {phoneNumber}</p>
                  <p><strong>Bank Account Number:</strong> {bankAccount ? '••••' + bankAccount.slice(-4) : 'Not set'}</p>
                  <p><strong>Bank Routing Number:</strong> {bankRouting ? '••••' + bankRouting.slice(-4) : 'Not set'}</p>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Customer;
