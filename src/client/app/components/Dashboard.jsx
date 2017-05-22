/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
/*eslint-enable no-unused-vars*/

const Dashboard = () => (
  <div>This is Dashboard.</div>
);

const mapStateToProps = state => ({
  state: state
});

export default connect(mapStateToProps)(Dashboard);
