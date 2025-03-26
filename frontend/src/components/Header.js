import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { USER_LOGOUT } from '../constants/userConstant';

function BasicExample() {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const [username, setUsername] = useState('User');

  useEffect(() => {
    if (userInfo && userInfo.access) {
      try {
        const tokenPayload = JSON.parse(atob(userInfo.access.split('.')[1]));
        if (tokenPayload.username) {
          setUsername(tokenPayload.username);
        }
      } catch (error) {
        console.error('toekn error:', error);
      }
    }
  }, [userInfo]);

  const logoutHandler = () => {
    dispatch({ type: USER_LOGOUT });
    localStorage.removeItem('userInfo');
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary" collapseOnSelect>
      <Container>
        <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/cart">Cart</Nav.Link>
            
            {userInfo ? (
              <NavDropdown title={username} id='username'>
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;