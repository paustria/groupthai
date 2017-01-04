import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Navbar from './Navbar';

class Dashboard extends Component {
    render() {
        return(
            <div>
                This is Dashboard.
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    data: state
});

export default connect(mapStateToProps)(Dashboard);
