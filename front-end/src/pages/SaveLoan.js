import React, { useEffect, useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';






function SaveLoan(props) {



    const[loan, setLoan] = useState({
        loan_origin_amount:"",
        interest_rate:"",
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
                    navigate('/Loan');
                }else{
                    alert('fails');
                }

            });

    }



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
            <Form onSubmit = {submitLoan}>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Loan_amount</Form.Label>
                    <Form.Control name="loan_origin_amount" placeholder="loan_origin_amount" onChange = {changeValue}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Interest_rate</Form.Label>
                    <Form.Control name="interest_rate" placeholder="interest_rate" onChange = {changeValue}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>


            </Form>
        </div>
    );
}


export default SaveLoan;
