import React, { PureComponent } from 'react';
import { loginWithProvider, loginWithEmail } from '../../../helpers/auth';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';
import {Link} from 'react-router-dom';
import Icon from '../../icon';

export default class Login extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      loginMessage: null
    }
  }

  socialLogin = provider => async e => {
    e.preventDefault();

    try {
      const data = await loginWithProvider(provider);
      //TODO save user in DB if not exists
      console.log(data);
    } catch (err) {
      this.setState({ loginMessage: err.message });
    }
  };

  login = async e => {
    e.preventDefault();

    try {
      const data = await loginWithEmail(this.email.value, this.pw.value);
      console.log(data);
    } catch (err) {
      this.setState({ loginMessage: err.message });
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
                  <Icon name="facebook" faSize="2x" onClick={this.socialLogin('facebook.com')}/>
                  <Icon name="google" faSize="2x" onClick={this.socialLogin('google.com')}/>
                  <Icon name="twitter" faSize="2x" onClick={this.socialLogin('twitter.com')}/></p>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Grid >
    );
  }
}
