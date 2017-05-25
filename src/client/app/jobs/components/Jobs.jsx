/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
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
    <Paper zDepth={1}>
      {
        jobs && jobs.map((job, i) =>
          (<Card key={i}>
            <div style={{float:'right', margin:20}}>{job.type}</div>
            <CardTitle title={job.title} subtitle={`${job.location.city}, ${job.location.state}`} />
            <CardText>
              {job.description}
            </CardText>
          </Card>)
        )
      }
    </Paper>
  );
});

const mapStateToProps = state => ({
  state: state
});

export default connect(mapStateToProps)(Jobs);
