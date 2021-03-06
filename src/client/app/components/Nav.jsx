/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
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
    textDecoration: 'none',
  },
  rightMenuContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '0',
  },
};

const Nav = withRouter(({ user, logout }) => {
  const onClickLogout = () => {
    try {
      logout();
      window.location.href = '/';
    } catch (err) {
      // TODO: Add error message.
      // this.setState({ error: err.message })
    }
  };
  const jobs = (<Link to="/jobs"><FlatButton label="หางาน" style={styles.textWhite} /></Link>);
  const registerBtn = (
    <Link to="/register"><FlatButton label="สร้างบัญชี" style={styles.textWhite} /></Link>);
  const loggedInBtn = (
    <IconMenu
      iconButtonElement={
        <IconButton><i className="material-icons">account_circle</i></IconButton>
      }
      targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      iconStyle={styles.textWhite}
    >
      <MenuItem
        containerElement={<Link to="/dashboard" />}
        primaryText="Dashboard"
      />
      <MenuItem onClick={onClickLogout} primaryText="ออกจากระบบ" />
    </IconMenu>
  );

  const navButton = user ? (
    <div style={styles.rightMenuContainer}>{jobs}{loggedInBtn}</div>
  ) : (
    <div style={styles.rightMenuContainer}>
      {jobs}
      <Link to="/login">
        <FlatButton label="เข้าสู่ระบบ" style={styles.textWhite} />
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
  loggedIn: state.app.loggedIn,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(app.actions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
