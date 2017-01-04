/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
/*eslint-enable no-unused-vars*/
import { connect } from 'react-redux';

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
