import map from 'lodash/map';
import uniq from 'lodash/uniq';
import flatten from 'lodash/flatten';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

const initialState = {
  type: 'all',
  jobs: null,
  jobTypes: [],
  keyword: '',
};

const styles = {
  jobType: { float: 'right', margin: 20, textTransform: 'capitalize' },
  jobTypes: { textTransform: 'capitalize' },
};

async function fetchJobs() {
  const response = await fetch('/api/jobs', { credentials: 'same-origin' });
  const res = await response.json();

  return res.jobs;
}

const getJobTypes = (jobs) => {
  const types = map(jobs, 'businessCategories');
  const unique = uniq(flatten(types));

  return unique;
};

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  async componentDidMount() {
    const jobs = await fetchJobs();
    this.setState({ jobs, jobTypes: ['all'].concat(getJobTypes(jobs)) });
  }

  // this is something similar to job.location.city.toLowerCase().indexOf(keyword) >= 0
  isIncluded(col, attribute, query) {
    const c = attribute.split('.');
    const next = attribute.split('.').slice(1, c.length).join('.');

    if (c.length === 1) {
      return col[c[0]].toLowerCase().includes(query);
    }

    return this.isIncluded(col[c[0]], next, query);
  }

  isMatchedFiltered(job) {
    const { keyword, type } = this.state;
    const query = keyword.toLowerCase();
    const columns = [
      'title',
      'description',
      'address.city',
      'address.state',
    ];

    return (job.isActive) &&
      (this.state.type === 'all' || job.businessCategories.includes(type)) &&
      columns.some(col => this.isIncluded(job, col, query));
  }

  render() {
    const jobs = this.state.jobs;
    const jobTypes = this.state.jobTypes;

    return (
      <Container>
        <Row>
          <Col md="5">
            <TextField
              floatingLabelText="Keyword"
              floatingLabelFixed
              hintText="title, description or location"
              onChange={event =>
                this.setState({ keyword: event.target.value })}
            />
          </Col>
          <Col md="5">
            <SelectField
              style={styles.jobTypes}
              floatingLabelText="Type"
              value={this.state.type}
              onChange={(event, index, type) => this.setState({ type })}
            >
              {
                jobTypes && jobTypes.map((type, i) =>
                  <MenuItem
                    style={styles.jobTypes}
                    key={i}
                    value={type} primaryText={type}
                  />,
                )
              }
            </SelectField>
          </Col>
        </Row>
        {
         jobs && jobs.map((job, i) =>
           this.isMatchedFiltered(job) ? (<Card key={i}>
             <div style={styles.jobType}>{job.businessCategories.join(', ')}</div>
             <CardTitle
               title={job.title}
               subtitle={`${job.address.city}, ${job.address.state}`}
             />
             <CardText>
               {job.description}
             </CardText>
           </Card>) : '')
         }
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  data: state,
});

export default connect(mapStateToProps)(Jobs);
