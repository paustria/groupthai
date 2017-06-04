/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
/*eslint-enable no-unused-vars*/
import { connect } from 'react-redux';
import app from 'app';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  textWhite: {
    color: 'white',
    textDecoration: 'none'
  },
  rightMenuContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '0'
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
  const jobs = (<Link to="/jobs"><FlatButton label='Jobs' style={styles.textWhite}/></Link>);
  const registerBtn = (<Link to="/register"><FlatButton label='Create Account' style={styles.textWhite}/></Link>);
  const loggedInBtn =(
    <IconMenu
      iconButtonElement={
        <IconButton><i className="material-icons">account_circle</i></IconButton>
      }
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      iconStyle={styles.textWhite}
    >
      <MenuItem primaryText={<Link to="/dashboard">Dashboard</Link>} />
      <MenuItem onClick={onClickLogout.bind(logout)} primaryText="Sign out" />
    </IconMenu>
  );
  const navButton = user ? (
    <div style={styles.rightMenuContainer}>{jobs}{loggedInBtn}</div>
  ) : (
    <div style={styles.rightMenuContainer}>
      {jobs}
      <Link to="/login">
        <FlatButton label='Log in' style={styles.textWhite}/>
      </Link>
      {registerBtn}
    </div>
  );

  return (
    <AppBar
      title={<Link to="/" style={styles.textWhite}>GroupThai</Link>}
      iconElementRight={navButton}
      iconStyleRight={styles.rightMenuContainer}
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
