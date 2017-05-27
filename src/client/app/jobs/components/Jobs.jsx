/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
/*eslint-enable no-unused-vars*/

const initialState = {
  type: 'all',
  status: 'active',
  jobs: null
};

const styles = {
  jobType : {float:'right', margin:20}
};

async function fetchJobs() {
  const response = await fetch('/api/jobs', {});
  const res = await response.json();
  return res.jobs;
}

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  async componentDidMount() {
    const jobs = await fetchJobs();
    this.setState({jobs: jobs});
  }

  isMatchedFiltered(job) {
    return (job.status === this.state.status) &&
      (this.state.type === 'all' || job.type === this.state.type);
  }

  render() {
    const jobs = this.state.jobs;

    return (
      <div>
        <SelectField
          floatingLabelText="Type"
          value={this.state.type}
          onChange={(event, index, type) => {this.setState({type})}}
        >
          <MenuItem value="all" primaryText="all" />
          <MenuItem value="restaurant" primaryText="restaurant" />
        </SelectField>
       {
         jobs && jobs.map((job, i) => {
           return this.isMatchedFiltered(job) ? (<Card key={i}>
             <div style={styles.jobType}>{job.type}</div>
             <CardTitle title={job.title} subtitle={`${job.location.city}, ${job.location.state}`} />
             <CardText>
               {job.description}
             </CardText>
           </Card>) : '';
           }
         )
       }
     </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state
});

export default connect(mapStateToProps)(Jobs);
