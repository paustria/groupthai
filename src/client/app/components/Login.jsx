import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { auth } from 'utils/auth';
import app from 'app';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const initialState = {
  email: '',
  password: '',
  confirmPassword: '',
  emailError: '',
  passwordError: '',
  confirmPasswordError: '',
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
    if(this.validateForm()) {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          username: this.state.email,
          password: this.state.password,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
      };

      try {
        const response = await fetch('/login', options);
        if(!response.ok) {
          throw Error('Not Authorized');
        }
        const body = await response.json();
        auth.setAuth(true);
        this.props.login(body.user);
      } catch (err) {
        this.setState({ error: err.message })
      }
    }
  }

  resetError() {
    this.setState({
      emailError: '',
      passwordError: '',
      confirmPasswordError: ''
    });
  }

  validateForm() {
    const isRegisterView = this.props.location.pathname === '/register';
    const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let hasError = false;

    this.resetError();

    if (!this.state.email) {
      hasError = true;
      this.setState({emailError: 'Please fill out email'});
    }
    if (!this.state.password) {
      hasError = true;
      this.setState({passwordError: 'Please fill out password'});
    }
    if (isRegisterView && !this.state.confirmPassword) {
      hasError = true;
      this.setState({confirmPasswordError: 'Please fill out confirmPassword'});
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
    const viewText = isRegisterView ? 'Register': 'Login';

    if (this.props.data.app.user) {
      return (
        <Redirect to="/dashboard"/>
      );
    }

    return (
      <div className="row">
        <div className="col-sm-2 col-sm-offset-5">
          <div className="text-center">
            <h2>{viewText}</h2>
            <form>
              <TextField floatingLabelText="Email" errorText={this.state.emailError} hintText="Please enter your email" value={this.state.email} onChange={(e) => this.setState({'email': e.target.value, 'emailError': ''})} />
              <TextField floatingLabelText="Password" errorText={this.state.passwordError} hintText="Please enter your password" type="password" value={this.state.password} onChange={(e)=> this.setState({'password': e.target.value, 'passwordError': ''})} />
              {isRegisterView && <TextField floatingLabelText="Confirm Password" errorText={this.state.confirmPasswordError} hintText="Please confirm your password" type="password" value={this.state.confirmPassword} onChange={(e)=> this.setState({'confirmPassword': e.target.value, 'confirmPasswordError': ''})} />}
              <RaisedButton label={viewText} primary={true} onClick={this.handleSubmit.bind(this)}/>
            </form>
            <a href="/auth/facebook">Test facebook login</a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state
});

const mapDispatchToProps = dispatch => ({
  login: (user) => dispatch(app.actions.login(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
