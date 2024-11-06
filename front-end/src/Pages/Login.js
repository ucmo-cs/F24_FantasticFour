import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

 
function Login() {
  
  const [loans, setLoans] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:8080/loans", {method:"GET"})
    .then(res => res.json())
    .then(res=> {setLoans(res);})
  },[])

  const navigate = useNavigate();


  const movePage = () => {
    navigate("/admindash");  
  };

  
  return (
    <div>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="email" placeholder="Username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            
            <Button variant="success" onClick={movePage}>Sign In</Button>
        </Form>
      

      
    </div>
  );
}


export default Login;