import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Navbar from './Navbar';

class Home extends Component {
    render() {
        return(
            <div>
                This is Home.
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    data: state
});

export default connect(mapStateToProps)(Home);