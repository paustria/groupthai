/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
/*eslint-enable no-unused-vars*/

async function fetchJobs() {
  const response = await fetch('/api/jobs', {});
  const res = await response.json();
  return res.jobs;
}

const withJobs = lifecycle({
  state: { jobs: null },
  async componentDidMount() {
    const jobs = await fetchJobs();
    this.setState({jobs: jobs});
  }
});

const Jobs = withJobs(({jobs}) => {
  return (
    <div>{jobs && jobs.map((job, i) => <div key={i}>{job.description}</div>)} This is jobs.</div>
  );
});

const mapStateToProps = state => ({
  state: state
});

export default connect(mapStateToProps)(Jobs);
