import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Logout from '../components/Logout';

function LoanCreator() {
  const [accounts, setAccounts] = useState([]);
  const [isNewAccount, setIsNewAccount] = useState(false);
  const [error, setError] = useState('');

  // Existing account selection
  const [selectedAccount, setSelectedAccount] = useState('');

  // New account fields
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Loan details
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/account", {
      method: "GET"
    })
      .then(res => res.json())
      .then(data => setAccounts(data))
      .catch(err => setError("Failed to load accounts"));
  }, []);

  const createAccount = async () => {
    const response = await fetch("http://localhost:8080/account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: username,
        password: "password",
        email: email,
        phoneNumber: phoneNumber,
        user_type: false
      })
    });
  
    if (!response.ok) {
      throw new Error('Failed to create account');
    }
  
    return await response.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      let accountId;

      if (isNewAccount) {
        //Create new account first
        const newAccount = await createAccount();
        accountId = newAccount.userId;
      } else {
        accountId = parseInt(selectedAccount, 10);
      }

      //Create loan with account ID
      const response = await fetch("http://localhost:8080/loans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_account: { userId: accountId },
          loan_origin_amount: parseFloat(loanAmount),
          interest_rate: parseFloat(interestRate),
          amountOwed: parseFloat(loanAmount),
          automaticPayment: 0.0,
          created_at: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create loan');
      }

      navigate('/admindash');
      
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    }
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Create New Loan</h2>
        <Logout />
      </div>
      
      {error && <div className="alert alert-danger">{error}</div>}

      <Form onSubmit={handleSubmit}>
        <Card className="mb-4">
          <Card.Header>
            <Form.Check
              type="switch"
              id="account-toggle"
              label="Create new account"
              checked={isNewAccount}
              onChange={(e) => setIsNewAccount(e.target.checked)}
            />
          </Card.Header>
          <Card.Body>
            {isNewAccount ? (
              //New Account Form
              <Row>
                <Col md={12}>
                  <Table bordered>
                    <tbody>
                      <tr>
                        <td width="33%">
                          <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                              type="text"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              required
                            />
                          </Form.Group>
                        </td>
                        <td width="33%">
                          <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </Form.Group>
                        </td>
                        <td width="33%">
                          <Form.Group>
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                              type="tel"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              required
                            />
                          </Form.Group>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="2">
                          <Form.Group>
                            <Form.Label>Loan Amount</Form.Label>
                            <Form.Control
                              type="number"
                              value={loanAmount}
                              onChange={(e) => setLoanAmount(e.target.value)}
                              required
                            />
                          </Form.Group>
                        </td>
                        <td>
                          <Form.Group>
                            <Form.Label>Interest Rate (%)</Form.Label>
                            <Form.Control
                              type="number"
                              step="0.01"
                              value={interestRate}
                              onChange={(e) => setInterestRate(e.target.value)}
                              required
                            />
                          </Form.Group>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            ) : (
              //Existing Account Selection
              <Row>
                <Col md={12}>
                  <Table bordered>
                    <tbody>
                      <tr>
                        <td>
                          <Form.Group>
                            <Form.Label>Select Account</Form.Label>
                            <Form.Select 
                              value={selectedAccount}
                              onChange={(e) => setSelectedAccount(e.target.value)}
                              required
                            >
                              <option value="">Choose an account...</option>
                              {accounts.map(account => (
                                <option key={account.userId} value={account.userId}>
                                  {account.userName} - {account.email}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="2">
                          <Form.Group>
                            <Form.Label>Loan Amount</Form.Label>
                            <Form.Control
                              type="number"
                              value={loanAmount}
                              onChange={(e) => setLoanAmount(e.target.value)}
                              required
                            />
                          </Form.Group>
                        </td>
                        <td>
                          <Form.Group>
                            <Form.Label>Interest Rate (%)</Form.Label>
                            <Form.Control
                              type="number"
                              step="0.01"
                              value={interestRate}
                              onChange={(e) => setInterestRate(e.target.value)}
                              required
                            />
                          </Form.Group>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            )}
          </Card.Body>
        </Card>

        <div className="mt-3">
          <Button variant="primary" type="submit">
            Create Loan
          </Button>
          <Button 
            variant="secondary" 
            className="ms-2"
            onClick={() => navigate('/admindash')}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default LoanCreator;
