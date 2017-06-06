import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { auth } from 'utils/auth';
import app from 'app';

import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

const initialState = {
  email: '',
  password: '',
  confirmPassword: '',
  emailError: '',
  passwordError: '',
  confirmPasswordError: '',
};

const style = {
  form: { marginLeft: 20 },
  formTitle: { paddingTop: 20, marginBottom: 0 },
  formBtn: { margin: 20 },
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keyup', this.handleKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyUp);
  }

  handleKeyUp(event) {
    this.setState({ error: '' });
    if (event.key === 'Enter') {
      this.handleSubmit();
    }
  }

  async handleSubmit() {
    const isRegisterView = this.props.location.pathname === '/register';
    const url = isRegisterView ? '/register' : '/login';

    if (this.validateForm()) {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          username: this.state.email,
          password: this.state.password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          if (response.statusText === 'Unauthorized') {
            throw Error('Username and/or password combination is incorrect.');
          }
          if (response.statusText === 'Forbidden') {
            throw Error('Email is already existed.');
          }
          throw Error(response.statusText);
        }
        const body = await response.json();
        auth.setAuth(true);
        this.props.login(body.user);
      } catch (err) {
        this.setState({ emailError: err.message });
      }
    }
  }

  resetError() {
    this.setState({
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
    });
  }

  validateForm() {
    const isRegisterView = this.props.location.pathname === '/register';
    const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let hasError = false;

    this.resetError();

    if (!this.state.email) {
      hasError = true;
      this.setState({ emailError: 'Please fill out email' });
    }
    if (!this.state.password) {
      hasError = true;
      this.setState({ passwordError: 'Please fill out password' });
    }
    if (isRegisterView && !this.state.confirmPassword) {
      hasError = true;
      this.setState({confirmPasswordError: 'Please fill out confirmPassword'});
    } else if (isRegisterView && (this.state.password != this.state.confirmPassword)) {
      hasError = true;
      this.setState({confirmPasswordError: 'Password does not match'});
    }
    if (this.state.email && !regexEmail.test(this.state.email)) {
      hasError = true;
      this.setState({emailError: 'Please fill out correct email format.'});
    }

    if (hasError) return false;

    return true;
  }

  render() {
    const isRegisterView = this.props.location.pathname === '/register';
    const viewText = isRegisterView ? 'Register' : 'Login';

    if (this.props.data.app.user) {
      return (
        <Redirect to="/dashboard"/>
      );
    }

    return (
      <Container>
        <Row>
          <Col md="6" md-offset="3">
            <Paper zDepth={1}>
              <h1 style={style.formTitle} className="mui--text-center">
                {viewText}
              </h1>
              <form>
                <TextField
                  style={style.form}
                  floatingLabelText="Email"
                  underlineShow={false}
                  errorText={this.state.emailError}
                  hintText="Please enter your email"
                  value={this.state.email}
                  onChange={(e) => this.setState({'email': e.target.value, 'emailError': ''})}
                />
                <Divider />
                <TextField
                  style={style.form}
                  floatingLabelText="Password"
                  underlineShow={false}
                  errorText={this.state.passwordError}
                  hintText="Please enter your password"
                  type="password"
                  value={this.state.password}
                  onChange={(e)=> this.setState({'password': e.target.value, 'passwordError': ''})}
                />
                {isRegisterView &&
                  <span>
                    <Divider />
                    <TextField
                      style={style.form}
                      floatingLabelText="Confirm Password"
                      underlineShow={false}
                      errorText={this.state.confirmPasswordError}
                      hintText="Please confirm your password"
                      type="password" value={this.state.confirmPassword}
                      onChange={(e)=> this.setState({'confirmPassword': e.target.value, 'confirmPasswordError': ''})}
                    />
                  </span>
                }
                <Divider />
                <div style={style.formBtn} className="mui--text-center">
                  <RaisedButton label={viewText} primary onClick={this.handleSubmit.bind(this)} />
                </div>
              </form>
              <div style={style.formBtn} className="mui--text-center">
                <a href="/auth/facebook">Test facebook login</a>
              </div>
            </Paper>
          </Col>
        </Row>
      </Container>
    );
  }
}

Login.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object,
  login: PropTypes.func,
};

const mapStateToProps = state => ({
  data: state,
});

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(app.actions.login(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
