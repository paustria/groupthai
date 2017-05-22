/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
/*eslint-enable no-unused-vars*/

const styles = {
  jumbotron: {
    background: 'url("img/landing.jpg") center center',
    color: 'white',
    height: '600px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  noMargin: {
    margin: '0px'
  }
};

class Home extends Component {
  render() {
    return(
      <div>
        <div style={styles.jumbotron}>
          <h1 style={styles.noMargin}>Bringing Thais in USA together</h1>
        </div>
      </div>
    );
  }
}

export default Home;
