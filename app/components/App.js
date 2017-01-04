/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import Nav from './Nav';
/*eslint-enable no-unused-vars*/
import { connect } from 'react-redux';

class App extends Component {
    render() {
        console.log('a', this.props.data.loggedIn);
        return(
            <div>
                <Nav loggedIn={this.props.data.loggedIn} history={this.props.history} location={this.props.location} dispatch={this.props.dispatch} currentlySending={this.props.data.currentlySending}/>
                {this.props.children}
            </div>
        );
    }
}

// Which props do we want to inject, given the global state?
const mapStateToProps = (state) => ({
    data: state
});

export default connect(mapStateToProps)(App);
