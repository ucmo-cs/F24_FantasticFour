import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert, Card, Table } from 'react-bootstrap';
import Header from '../components/Header';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      if (user.user_type) {
        navigate('/admindash');
      } else {
        navigate('/customer');
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: username,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const user = await response.json();
      localStorage.setItem('user', JSON.stringify(user));

      if (user.user_type) {
        navigate('/admindash');
      } else {
        navigate('/customer');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
      <>
        <Header userName="" />
        <div style={{
          minHeight: '100vh',
          padding: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Container style={{ maxWidth: '600px' }}>
            <Card className="shadow">
              <Card.Header className="bg-success text-white py-3">
                <h2 className="mb-0 text-center">Loan Management System</h2>
              </Card.Header>
              <Card.Body className="p-4">
                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Table bordered>
                    <tbody>
                    <tr>
                      <td className="bg-light" width="30%">
                        <Form.Label className="mb-0">Username</Form.Label>
                      </td>
                      <td>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Enter username"
                            className="border-0"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="bg-light">
                        <Form.Label className="mb-0">Password</Form.Label>
                      </td>
                      <td>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter password"
                            className="border-0"
                        />
                      </td>
                    </tr>
                    </tbody>
                  </Table>

                  <div className="text-center mt-4">
                    <Button
                        variant="primary"
                        type="submit"
                        size="lg"
                        className="px-5"
                    >
                      Login
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Container>
        </div>
      </>
  );
}

export default Login;