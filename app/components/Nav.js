/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { Link } from 'react-router';
/*eslint-enable no-unused-vars*/
import { logout } from 'actions';

class Nav extends Component {
    render() {
        const navButtons = this.props.loggedIn ? (
            <li><a href="#" onClick={this._logout.bind(this)}>Logout</a></li>
        ) : (
            <li><Link href="/login">Login</Link></li>
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
                        <Link className="navbar-brand" href="/">Brand</Link>
                    </div>
                    <div className="collapse navbar-collapse" id="navbar-collapse">
                        <ul className="nav navbar-nav navbar-right">
                            { navButtons }
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }

    _logout() {
        this.props.dispatch(logout());
    }
}

Nav.propTypes = {
    loggedIn: React.PropTypes.bool.isRequired,
    currentlySending: React.PropTypes.bool.isRequired
};

export default Nav;
