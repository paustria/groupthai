/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
/*eslint-enable no-unused-vars*/

class NotFound extends Component {
  render() {
    return(
      <article>
        <h1>Page not found.</h1>
        <Link to="/" className="btn">Home</Link>
      </article>
    );
  }
}

export default NotFound;
