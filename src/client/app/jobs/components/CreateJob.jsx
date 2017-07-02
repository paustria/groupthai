import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import { JOB_TYPES } from 'shared/constants';

const initialState = {
  draft: {
    title: '',
    description: '',
    address: {
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipcode: '',
    },
    contact: {
      organizationName: '',
      name: '',
      phone: [],
      email: '',
      website: '',
      lineID: '',
    },
    imgLoc: [],
    expiredDate: 0,
    createdBy: '',
    updatedBy: '',
    businessCategories: '',
  },
};

const styles = {
  subTitle: { fontSize: '2rem', paddingTop: '20px' },
  description: { paddingTop: '20px' },
  submitBtn: { margin: '20px 0' },
  jobTypes: { textTransform: 'capitalize' },
};

class CreateJob extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.handleJobTypeChange = this.handleJobTypeChange.bind(this);
  }

  setTitle(event, value) {
    this.setState({
      draft: {
        ...this.state.draft,
        title: value,
      },
    });
  }

  handleJobTypeChange(event, index, value) {
    this.setState({
      draft: {
        ...this.state.draft,
        businessCategories: value,
      },
    });
  }

  handleSubmit() {
    // TODO :: Do something.
    console.log(this.state);
  }

  render() {
    const { subTitle, description, submitBtn, jobTypes } = styles;
    const { draft } = this.state;

    return (
      <Container>
        <Row>
          <Col md="12">
            <div style={subTitle}>Required Fields</div>
            <TextField
              floatingLabelText="Job Title*"
              floatingLabelFixed
              hintText="Please fill job title"
              fullWidth
              onChange={this.setTitle}
            />
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <TextField
              floatingLabelText="Job description*"
              hintText="Please fill job description"
              floatingLabelFixed
              multiLine
              fullWidth
              rows={2}
            />
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <SelectField
              floatingLabelText="Job type*"
              value={draft.businessCategories}
              onChange={this.handleJobTypeChange}
            >
              {
                JOB_TYPES.map(type =>
                  <MenuItem
                    key={type}
                    style={jobTypes}
                    value={type}
                    primaryText={type}
                  />)
              }
            </SelectField>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <TextField
              hintText="Contact Name"
              floatingLabelText="Contact Name*"
              floatingLabelFixed
              fullWidth
            />
          </Col>
        </Row>
        <div style={description}>*At least one of the following.</div>
        <Row>
          <Col md="6">
            <TextField
              hintText="Phone"
              floatingLabelText="Phone"
              floatingLabelFixed
              fullWidth
            />
          </Col>
          <Col md="6">
            <TextField
              hintText="Email"
              floatingLabelText="Email"
              floatingLabelFixed
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <div style={subTitle}>Optional Fields</div>
            <TextField
              hintText="Please fill address 1"
              floatingLabelText="Address"
              floatingLabelFixed
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <TextField
              hintText="Please fill address 2"
              floatingLabelText="Address"
              floatingLabelFixed
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col md="4">
            <TextField
              hintText="City"
              floatingLabelText="City"
              floatingLabelFixed
              fullWidth
            />
          </Col>
          <Col md="4">
            <TextField
              hintText="State"
              floatingLabelText="State"
              floatingLabelFixed
              fullWidth
            />
          </Col>
          <Col md="4">
            <TextField
              hintText="Zipcode"
              floatingLabelText="Zipcode"
              floatingLabelFixed
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <TextField
              hintText="Organization Name"
              floatingLabelText="Organization Name"
              floatingLabelFixed
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <TextField
              hintText="Website"
              floatingLabelText="Website"
              floatingLabelFixed
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <TextField
              hintText="Line ID"
              floatingLabelText="Line ID"
              floatingLabelFixed
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <DatePicker
              hintText="Expired Date"
              floatingLabelText="Expired Date"
              floatingLabelFixed
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <RaisedButton
              style={submitBtn}
              label="Post Job"
              primary
              onClick={this.handleSubmit}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  data: state,
});

export default connect(mapStateToProps)(CreateJob);
