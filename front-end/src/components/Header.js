import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Logout from './Logout';

function Header() {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    return (
        <Navbar bg="success" expand="lg">
            <Container className="headerImg rounded-5">
                <Container >
                <Navbar.Brand>
                    <img
                        src="https://www.commercebank.com/-/media/cb/images/masthead/site-logo/commerce-bank-logo-2x.png?revision=8053fce9-78ee-41e0-aa9a-c1cfab49ec14&modified=20180604184102"
                        alt="Commerce Bank logo"
                    />
                </Navbar.Brand>
            </Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className={"custom-toggle"}/>
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    {user && <Logout />}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;