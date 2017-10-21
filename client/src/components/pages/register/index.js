import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { register, socialLogin } from '../../../helpers/auth';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';
import { Link } from 'react-router-dom';
import Icon from '../../icon';

export default class Login extends PureComponent {
  static contextTypes = {
    growl: PropTypes.object.isRequired,
  };

  onSocialLogin = provider => async e => {
    e.preventDefault();

    try {
      await socialLogin(provider);
    } catch (err) {
      this.context.growl.error(err.message);
    }
  };

  signUp = async e => {
    e.preventDefault();

    if (this.pw.value !== this.pwConfirm.value) {
      return this.context.growl.warning('Passwords doesn\'t match');
    }

    try {
      const data = await register({ email: this.email.value, pw: this.pw.value, displayName: this.name.value });
      console.log(data);
    } catch (err) {
      const { code } = err;
      if (code === 'auth/weak-password') {
        return this.context.growl.warning('Password should be at least 6 characters');
      } else if (code === 'auth/email-already-in-use') {
        return this.context.growl.warning('The email address is already in use by another account.');
      }
      this.context.growl.error(err.message);
    }
  };

  render() {
    return (
      <Grid>
        <Row>
          <Col sm={4} smOffset={4}>
            <h1>Sign Up</h1>
            <Form onSubmit={this.signUp}>
              <FormGroup>
                <FormControl inputRef={ref => this.name = ref} placeholder="Name"/>
              </FormGroup>
              <FormGroup>
                <FormControl inputRef={ref => this.email = ref} type="email" placeholder="Email"/>
              </FormGroup>
              <FormGroup>
                <FormControl inputRef={ref => this.pw = ref} type="password" placeholder="Password"/>
              </FormGroup>
              <FormGroup>
                <FormControl inputRef={ref => this.pwConfirm = ref} type="password" placeholder="Confirm Password"/>
              </FormGroup>
              <FormGroup>
                <Button type="submit" bsStyle="success" block>Register</Button>
              </FormGroup>
              <FormGroup>
                <p>Already have an account? <Link to="/login">Login</Link></p>
              </FormGroup>
              <FormGroup>
                <hr />
                <p>Register with
                  <Icon name="facebook" faSize="2x" onClick={this.onSocialLogin('facebook.com')}/>
                  <Icon name="google" faSize="2x" onClick={this.onSocialLogin('google.com')}/>
                  <Icon name="twitter" faSize="2x" onClick={this.onSocialLogin('twitter.com')}/></p>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Grid >
    );
  }
}
