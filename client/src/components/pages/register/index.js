import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
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
import { addWarningAlert, addErrorAlert } from '../../../actions/alerts';
import { Translate, I18n } from 'react-redux-i18n';

export class Register extends PureComponent {

  onSocialLogin = provider => async e => {
    e.preventDefault();

    try {
      await socialLogin(provider);
    } catch (err) {
      this.props.showWarningAlert(err.message);
    }
  };

  signUp = async e => {
    const {
      showWarningAlert
    } = this.props;

    e.preventDefault();

    if (this.pw.value !== this.pwConfirm.value) {
      return showWarningAlert('error.passwordsDoesntMatch');
    }

    try {
      await register({ email: this.email.value, pw: this.pw.value, displayName: this.name.value });
    } catch (err) {
      const { code } = err;
      if (code === 'auth/weak-password') {
        return showWarningAlert('error.weakPassword');
      } else if (code === 'auth/email-already-in-use') {
        return showWarningAlert('error.emailAlreadyInUse');
      }
      showWarningAlert(err.message);
    }
  };

  render() {
    return (
      <Grid>
        <Row>
          <Col sm={4} smOffset={4}>
            <h1><Translate value="register.signUp"/></h1>
            <Form onSubmit={this.signUp}>
              <FormGroup>
                <FormControl inputRef={ref => this.name = ref} placeholder={I18n.t('user.name')}/>
              </FormGroup>
              <FormGroup>
                <FormControl inputRef={ref => this.email = ref} type="email" placeholder={I18n.t('user.email')}/>
              </FormGroup>
              <FormGroup>
                <FormControl inputRef={ref => this.pw = ref} type="password" placeholder={I18n.t('user.password')}/>
              </FormGroup>
              <FormGroup>
                <FormControl inputRef={ref => this.pwConfirm = ref} type="password"
                             placeholder={I18n.t('user.confirmPassword')}/>
              </FormGroup>
              <FormGroup>
                <Button type="submit" bsStyle="success" block><Translate value="register.label"/></Button>
              </FormGroup>
              <FormGroup>
                <p><Translate value="register.alreadyHaveAnAccount"/> <Link to="/login"><Translate value="login.label"/></Link>
                </p>
              </FormGroup>
              <FormGroup>
                <hr />
                <p><Translate value="register.registerWith"/>
                  <Icon name="facebook" faSize="2x" onClick={this.onSocialLogin('facebook.com')}/>
                  <Icon name="google" faSize="2x" onClick={this.onSocialLogin('google.com')}/>
                  <Icon name="twitter" faSize="2x" onClick={this.onSocialLogin('twitter.com')}/></p>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showWarningAlert: (message, title) => {
      dispatch(addWarningAlert(message, title));
    },
    showErrorAlert: (message, title) => {
      dispatch(addErrorAlert(message, title));
    }
  }
};

const RegisterContainer = connect(null, mapDispatchToProps)(Register);

export default RegisterContainer;
