import React, { Component } from 'react';
// import Navbar from './Navbar';

class Home extends Component {
    render() {
        return(
            <div>
                This is Home.
                {this.props.children}
            </div>
        )
    }
}

export default Home;
