import React, { PureComponent } from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Translate } from 'react-redux-i18n';

export default class Header extends PureComponent {
  render() {
    return (
      <Navbar inverse collapseOnSelect fluid fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">
              <Translate value="app.name"/>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {this.props.loggedIn
            ?
            <Nav pullRight>
              <NavItem eventKey={1} onClick={() => this.props.logout()}>
                <Translate value="header.logout"/>
              </NavItem>
            </Nav>
            :
            <Nav pullRight>
              <LinkContainer to="/login">
                <NavItem eventKey={2}>
                  <Translate value="login.label"/>
                </NavItem>
              </LinkContainer>
              <LinkContainer to="/register">
                <NavItem eventKey={3}>
                  <Translate value="register.label"/>
                </NavItem>
              </LinkContainer>
            </Nav>
          }
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};
