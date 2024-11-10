import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Customer() {
  const navigate = useNavigate();
  const [loan, setLoan] = useState({
    loan_id: null,
    loan_origin_amount: 0,
    amountOwed: 0,
    interest_rate: 0,
    automaticPayment: 0,
    created_at: null,
    user_account: {
      userId: null,
      userName: '',
      email: '',
      phoneNumber: '',
      bankAccount: '',
      bankRouting: ''
    }
  });

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
    
    // Fetch loan details for this user
    fetch(`http://localhost:8080/loans/user/${user.userId}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch loan details');
        return res.json();
      })
      .then(data => {
        setLoan(data);
        // Populate form fields with existing data
        setUserName(data.user_account.userName || '');
        setEmail(data.user_account.email || '');
        setPhoneNumber(data.user_account.phoneNumber || '');
        setBankAccount(data.user_account.bankAccount || '');
        setBankRouting(data.user_account.bankRouting || '');
      })
      .catch(err => setError(err.message));
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`http://localhost:8080/account/${loan.user_account.userId}`, {
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
      // Refresh loan data
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
      
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header>
              <h4>Loan Details</h4>
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
