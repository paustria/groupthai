/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
/*eslint-enable no-unused-vars*/
import { connect } from 'react-redux';
import app from 'app';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  textWhite: {
    color: 'white',
    textDecoration: 'none'
  }
};

async function onClickLogout() {
  try {
    const logout = this;
    const response = await fetch('/logout', {});

    if(!response.ok) {
      throw Error('Not Authorized');
    }
    logout();
    window.location.href = '/';
  } catch (err) {
    // TODO: Add error message.
    // this.setState({ error: err.message })
  }
}

const Nav = withRouter(({user, logout}) => {
  const registerBtn = (<Link to="/register"><FlatButton label='Create Account' style={styles.textWhite}/></Link>);
  const navButton = user ? (
    <div><FlatButton label="Logout" onClick={onClickLogout.bind(logout)} style={styles.textWhite}/></div>
  ) : (
    <div><Link to="/login"><FlatButton label='Log in' style={styles.textWhite}/></Link>{registerBtn}</div>
  );

  return (
    <AppBar
      title={<Link to="/" style={styles.textWhite}>GroupThai กลุ่มคนไทย</Link>}
      iconElementRight={navButton}
      iconStyleRight={styles.navRight}
      showMenuIconButton={false}
    />
  );
});

const mapStateToProps = state => ({
  user: state.app.user,
  loggedIn: state.app.loggedIn
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(app.actions.logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
