/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from 'components/Nav';
/*eslint-enable no-unused-vars*/

class App extends Component {
    render() {
        return(
            <div>
                <Nav loggedIn={this.props.data.loggedIn} history={this.props.history} location={this.props.location} dispatch={this.props.dispatch} currentlySending={this.props.data.currentlySending}/>
                {this.props.children}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    data: state
});

export default connect(mapStateToProps)(App);
