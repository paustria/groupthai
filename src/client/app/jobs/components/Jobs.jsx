/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
/*eslint-enable no-unused-vars*/

const Jobs = () => (
  <div>This is jobs.</div>
);

const mapStateToProps = state => ({
  state: state
});

export default connect(mapStateToProps)(Jobs);
