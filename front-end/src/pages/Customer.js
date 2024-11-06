import React from 'react';
 
function Customer() {
  return (
    <div>
       Customer page
       <Table striped bordered hover>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Amount Due</th>
              <th>Original Amount</th>
              <th>Date Started</th>
              <th>Interest Rate</th>
              <th>Date paid in full</th>
            </tr>
          </thead>
          <tbody>
            {Account.map(Account =>
              {loans.map(loan => 
                <tr>
                  <td>{Acount.userName}</td>
                  <td>amount due</td>
                  <td>{loan.loan_origin_amount}</td>
                  <td>{loan.created_at}</td>
                  <td>{loan.interest_rate}</td>
                  <td>date paid in full</td>
                </tr>
              )}
            )}
          </tbody>
        </Table>
       personal info:
       edit button
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Customer email</th>
              <th>Customer phone</th>
              <th>Customer Acc #</th>
              <th>Customer Routing #</th>
            </tr>
          </thead>
          <tbody>
            {Account.map(Account =>
              <tr>
                <td>{Acount.userName}</td>
                <td>{Account.email}l</td>
                <td>{Account.phoneNumber}</td>
                <td>{Account.bankAcount}</td>
                <td>{Account.bankRouting}</td>
              </tr>
            )}
          </tbody>
        </Table>
    </div>
  );
}


export default Customer;
