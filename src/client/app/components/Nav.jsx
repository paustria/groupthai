/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
/*eslint-enable no-unused-vars*/
import { connect } from 'react-redux';
import app from 'app';

const Nav = withRouter(({loggedIn, logout}) => {
    const navButtons = loggedIn ? (
        <li><a href="" onClick={logout}>Logout</a></li>
    ) : (
        <li><Link to="/login">Login</Link></li>
    );

    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button className="navbar-toggle collapsed"
                        data-toggle="collapse"
                        data-target="#navbar-collapse">
                        <span className="sr-only">Toggle Navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="/">Brand</a>
                </div>
                <div className="collapse navbar-collapse" id="navbar-collapse">
                    <ul className="nav navbar-nav navbar-right">
                        {navButtons}
                    </ul>
                </div>
            </div>
        </nav>
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
