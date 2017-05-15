/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
/*eslint-enable no-unused-vars*/
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

class Home extends Component {
    render() {
        return(
            <div>
                This is Home.
                <RaisedButton label="Default" />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    data: state
});

export default connect(mapStateToProps)(Home);
