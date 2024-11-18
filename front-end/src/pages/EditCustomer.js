import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function EditCustomer() {

    const[loan, setLoan] = useState({
        userName:"",
        email:"",
        phoneNumber:"",
        accountNumber:"",
        routingNumber:"",
          });  
     
      const navigate = useNavigate();
    
    
      const submitLoan =(e)=>{
            e.preventDefault();
    
    
            fetch("http://localhost:8080/loan", {
                method:"POST",
                headers:{
                  "Content-Type" : "application/json"
                },
                body: JSON.stringify(loan)
              })
              .then(res=>{
                  console.log(1,res);
                  if(res.status === 201){
                    return res.json();
                  }else{
                    return null;
                  }
                })
              .then(res=>{
                console.log(res)
                if(res!==null){
                    navigate('/Customer');
                }else{
                  alert('fails');
                }
             
              });
           
        }
    
        const moveToDash = () => {
          navigate("/Customer");  
        };
     
        const changeValue=(e)=>{
            console.log(e);
            setLoan({
             ...loan, [e.target.name]:e.target.value  
            });
            console.log(e.target.name + " name "  );
            console.log(e.target.value + " value " );
          }
    
    
    
    
      return (


   <div>
      <Header />
      <h1>Personal Info:</h1>
        <Button variant='success' onClick={moveToCustomer}>{"<-- Back"}</Button>  
        <Form onSubmit = {submitInfo}>


            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Customer Full Name</Form.Label>
                <Form.Control name="userName" placeholder="name" onChange = {changeValue}/>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Customer Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange = {changeValue}/>
            </Form.Group>  

            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Customer Phone Number</Form.Label>
                <Form.Control name="phoneNumber" placeholder="phoneNumber" onChange = {changeValue}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Customer Account Number</Form.Label>
                <Form.Control name="accountNumber" placeholder="accountNumber" onChange = {changeValue}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Customer Account Number</Form.Label>
                <Form.Control name="routingNumber" placeholder="routingNumber" onChange = {changeValue}/>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit  
            </Button>


        </Form>
    </div>
  );
}


export default EditCustomer;
