/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
/*eslint-enable no-unused-vars*/
import { connect } from 'react-redux';
import app from 'app';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const styles = {
    uploadInput: {
        color: 'white'
    }
};

const Nav = withRouter(({loggedIn, logout}) => {
    const navButton = loggedIn ? (
        <a href="" onClick={logout}>Logout</a>
    ) : (
        <FlatButton label="Log in" href="/login" />
    );

    return (
        <AppBar
            title={<FlatButton label="GroupThai กลุ่มคนไทย" href="/" style={styles.uploadInput} />}
            iconElementRight={navButton}
            showMenuIconButton={false}
        />
    );
});

const mapStateToProps = state => ({
    // user: state.app.user
    user: null,
    loggedIn: state.app.loggedIn
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(app.actions.logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
