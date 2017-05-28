/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Container from 'muicss/lib/react/container';
/*eslint-enable no-unused-vars*/

const Dashboard = () => (
  <Container>This is Dashboard.</Container>
);

const mapStateToProps = state => ({
  state: state
});

export default connect(mapStateToProps)(Dashboard);
