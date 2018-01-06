import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { socialLogin, loginWithEmail } from '../../../helpers/auth';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';
import { Link } from 'react-router-dom';
import Icon from '../../icon';
import { addInfoAlert, addErrorAlert } from '../../../actions/alerts';

class Login extends PureComponent {

  onSocialLogin = provider => async e => {
    e.preventDefault();

    try {
      await socialLogin(provider);
    } catch (err) {
      this.props.showErrorAlert(err.message);
    }
  };

  login = async e => {
    e.preventDefault();

    try {
      await loginWithEmail(this.email.value, this.pw.value);
    } catch (err) {
      this.props.showErrorAlert('Invalid Username or Password');
    }
  };

  render() {
    return (
      <Grid>
        <Row>
          <Col sm={4} smOffset={4}>
            <h1>Login</h1>
            <Form onSubmit={this.login}>
              <FormGroup>
                <FormControl inputRef={ref => this.email = ref} type="email" placeholder="Email"/>
              </FormGroup>
              <FormGroup>
                <FormControl inputRef={ref => this.pw = ref} type="password" placeholder="Password"/>
              </FormGroup>
              <FormGroup>
                <Button type="submit" bsStyle="success" block>Login</Button>
              </FormGroup>
              <FormGroup>
                <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
              </FormGroup>
              <FormGroup>
                <hr />
                <p>Sign in with
                  <Icon name="facebook" faSize="2x" onClick={this.onSocialLogin('facebook.com')}/>
                  <Icon name="google" faSize="2x" onClick={this.onSocialLogin('google.com')}/>
                  <Icon name="twitter" faSize="2x" onClick={this.onSocialLogin('twitter.com')}/>
                </p>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Grid >
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showInfoAlert: (message, title) => {
      dispatch(addInfoAlert(message, title));
    },
    showErrorAlert: (message, title) => {
      dispatch(addErrorAlert(message, title));
    }
  }
};

const LoginContainer = connect(null, mapDispatchToProps)(Login);

export default LoginContainer;
