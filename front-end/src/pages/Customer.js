import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Form, Button, Card, Modal, Tabs, Tab } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import '../App.css';

function Customer() {
  const navigate = useNavigate();
  const [loans, setLoans] = useState([]);
  const [isEditing, setIsEditing] = useState({});
  const [error, setError] = useState('');
  const [automaticPayments, setAutomaticPayments] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [currentLoanId, setCurrentLoanId] = useState(null);
  const [customerDetails, setCustomerDetails] = useState({
    firstName: '',
    email: '',
    phoneNumber: '',
    bankAccount: '',
    bankRouting: ''
  });

  useEffect(() => {
    fetchLoans();
    fetchCustomerDetails();
  }, [navigate]);

  const fetchLoans = () => {
    const userString = localStorage.getItem('user');
    if (!userString) {
      navigate('/login');
      return;
    }

    const user = JSON.parse(userString);

    fetch(`http://localhost:8080/loans/user/${user.userId}`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch loans');
          return res.json();
        })
        .then(data => {
          setLoans(data);
          const payments = {};
          const editingState = {};
          data.forEach(loan => {
            payments[loan.loanid] = loan.automaticPayment || '';
            editingState[loan.loanid] = false;
          });
          setAutomaticPayments(payments);
          setIsEditing(editingState);
        })
        .catch(err => setError(err.message));
  };

  const fetchCustomerDetails = () => {
    const userString = localStorage.getItem('user');
    if (!userString) {
      navigate('/login');
      return;
    }

    const user = JSON.parse(userString);

    fetch(`http://localhost:8080/account/${user.userId}`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch customer details');
          return res.json();
        })
        .then(data => {
          setCustomerDetails({
            firstName: data.firstName || '',
            email: data.email || '',
            phoneNumber: data.phoneNumber || '',
            bankAccount: data.bankAccount || '',
            bankRouting: data.bankRouting || ''
          });
        })
        .catch(err => setError(err.message));
  };

  const handleSubmit = async (e, loanId) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`http://localhost:8080/loans/update-automatic-payment`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          loanid: loanId,
          automaticPayment: automaticPayments[loanId]
        })
      });

      if (!response.ok) throw new Error('Failed to update automatic payment');

      setLoans(loans.map(loan =>
          loan.loanid === loanId ? { ...loan, automaticPayment: automaticPayments[loanId] } : loan
      ));
      setIsEditing({ ...isEditing, [loanId]: false });
      setShowModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleShowModal = (loanId) => {
    setCurrentLoanId(loanId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentLoanId(null);
  };

  const handleCustomerDetailsChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({ ...customerDetails, [name]: value });
  };

  const handleCustomerDetailsSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const userString = localStorage.getItem('user');
    if (!userString) {
      navigate('/login');
      return;
    }

    const user = JSON.parse(userString);
    const updatedDetails = { ...customerDetails, userId: user.userId };

    try {
      const response = await fetch(`http://localhost:8080/account/update-account`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDetails),
      });

      if (!response.ok) throw new Error('Failed to update customer details');
      alert('Customer details updated successfully');
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

  const calculatePayoffTime = (amountOwed, automaticPayment, interestRate) => {
    if (automaticPayment <= 0 || interestRate <= 0) return 'Free Money';
    const monthlyInterestRate = interestRate / 100 / 12;
    const months = Math.log(automaticPayment / (automaticPayment - amountOwed * monthlyInterestRate)) / Math.log(1 + monthlyInterestRate);
    return Math.ceil(months) + ' months';
  };

  return (
      <>
        <Header />
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', }}>
          <Card className="rounded shadow w-100" style={{ maxWidth: '100%' }}>
            <Card.Body>
              {error && <div className="alert alert-danger">{error}</div>}
              <Tabs defaultActiveKey="loans" id="customer-tabs">
                <Tab eventKey="loans" title="Loans">
                  <Row className="justify-content-center">
                    <Col md={12}>
                      <Button variant="secondary" onClick={fetchLoans} className="mb-3">
                        Refresh
                      </Button>
                      <Card className="rounded">
                        <Card.Body>
                          <Table striped bordered hover>
                            <thead>
                            <tr>
                              <th>#</th>
                              <th>Date Taken</th>
                              <th>Amount Due</th>
                              <th>Original Amount</th>
                              <th>Interest Rate</th>
                              <th>Automatic Payment</th>
                              <th>Estimated Payoff Time</th>
                              <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {loans.map((loan, index) => (
                                <tr key={loan.loanid}>
                                  <td>{index + 1}</td>
                                  <td>{formatDate(loan.created_at)}</td>
                                  <td>{formatCurrency(loan.amountOwed)}</td>
                                  <td>{formatCurrency(loan.loan_origin_amount)}</td>
                                  <td>{loan.interest_rate}%</td>
                                  <td>{formatCurrency(loan.automaticPayment)}</td>
                                  <td>{calculatePayoffTime(loan.amountOwed, loan.automaticPayment, loan.interest_rate)}</td>
                                  <td className="text-center">
                                    <Button
                                        variant="primary"
                                        onClick={() => handleShowModal(loan.loanid)}
                                    >
                                      Edit
                                    </Button>
                                  </td>
                                </tr>
                            ))}
                            </tbody>
                          </Table>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Tab>
                <Tab eventKey="details" title="Customer Information">
                  <div className="customer-info-tab">
                    <Form onSubmit={handleCustomerDetailsSubmit}>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label className="short-label">Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                                value={customerDetails.firstName}
                                onChange={handleCustomerDetailsChange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label className="short-label">Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={customerDetails.email}
                                onChange={handleCustomerDetailsChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label className="short-label">Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="phoneNumber"
                                value={customerDetails.phoneNumber}
                                onChange={handleCustomerDetailsChange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label className="short-label">Bank Account</Form.Label>
                            <Form.Control
                                type="text"
                                name="bankAccount"
                                value={customerDetails.bankAccount}
                                onChange={handleCustomerDetailsChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label className="short-label">Routing Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="bankRouting"
                                value={customerDetails.bankRouting}
                                onChange={handleCustomerDetailsChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Button variant="primary" type="submit" className="mt-3">
                        Save
                      </Button>
                    </Form>
                  </div>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Container>

        <Modal show={showModal} onHide={handleCloseModal} centered className="modal-centered">
          <Modal.Header closeButton>
            <Modal.Title>Edit Automatic Payment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={(e) => handleSubmit(e, currentLoanId)}>
              <Form.Group>
                <Form.Label>Automatic Payment</Form.Label>
                <Form.Control
                    type="number"
                    value={automaticPayments[currentLoanId] || ''}
                    onChange={(e) => setAutomaticPayments({
                      ...automaticPayments,
                      [currentLoanId]: e.target.value
                    })}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Save
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
  );
}

export default Customer;