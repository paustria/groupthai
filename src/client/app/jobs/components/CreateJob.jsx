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
import Snackbar from 'material-ui/Snackbar';
import { JOB_TYPES } from 'shared/constants';
import { dateToEpoch } from 'shared/utils/time';

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
    imgLoc: [], // This feature is disabled.
    expiredDate: 0,
    createdBy: '',
    updatedBy: '',
    businessCategories: '',
    isActive: true,
  },
  notificationMessage: '',
};

const styles = {
  subTitle: { fontSize: '2rem', paddingTop: '20px' },
  description: { paddingTop: '20px' },
  submitBtn: { margin: '20px 0' },
  jobTypes: { textTransform: 'capitalize' },
};

const postJob = async (job) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(job),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  };

  try {
    const response = await fetch('api/job', options);

    if (!response.ok) {
      if (response.statusText === 'Unauthorized') {
        throw Error('Username and/or password combination is incorrect.');
      }
      if (response.statusText === 'Forbidden') {
        throw Error('Email is already existed.');
      }
      throw Error(response.statusText);
    }

    const jobDoc = await response.json();

    return `successfully created ${jobDoc.title}.`;
  } catch (err) {
    throw Error(err.message);
  }
};

class CreateJob extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.setDescription = this.setDescription.bind(this);
    this.setName = this.setName.bind(this);
    this.setPhone = this.setPhone.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setAddress1 = this.setAddress1.bind(this);
    this.setAddress2 = this.setAddress2.bind(this);
    this.setCity = this.setCity.bind(this);
    this.setCountryState = this.setCountryState.bind(this);
    this.setZip = this.setZip.bind(this);
    this.setOrganization = this.setOrganization.bind(this);
    this.setJobType = this.setJobType.bind(this);
    this.setWebsite = this.setWebsite.bind(this);
    this.setLine = this.setLine.bind(this);
    this.setExpired = this.setExpired.bind(this);
  }

  setTitle(event, value) {
    this.setState({
      draft: {
        ...this.state.draft,
        title: value,
      },
    });
  }

  setDescription(event, value) {
    this.setState({
      draft: {
        ...this.state.draft,
        description: value.replace(/(?:\r\n|\r|\n)/g, '<br />'),
      },
    });
  }

  setName(event, value) {
    this.setState({
      draft: {
        ...this.state.draft,
        contact: {
          ...this.state.draft.contact,
          name: value,
        },
      },
    });
  }

  setPhone(event, value) {
    this.setState({
      draft: {
        ...this.state.draft,
        contact: {
          ...this.state.draft.contact,
          phone: [value],
        },
      },
    });
  }

  setEmail(event, value) {
    this.setState({
      draft: {
        ...this.state.draft,
        contact: {
          ...this.state.draft.contact,
          email: value,
        },
      },
    });
  }

  setAddress1(event, value) {
    this.setState({
      draft: {
        ...this.state.draft,
        address: {
          ...this.state.draft.address,
          address1: value,
        },
      },
    });
  }

  setAddress2(event, value) {
    this.setState({
      draft: {
        ...this.state.draft,
        address: {
          ...this.state.draft.address,
          address2: value,
        },
      },
    });
  }

  setCity(event, value) {
    this.setState({
      draft: {
        ...this.state.draft,
        address: {
          ...this.state.draft.address,
          city: value,
        },
      },
    });
  }

  setCountryState(event, value) {
    this.setState({
      draft: {
        ...this.state.draft,
        address: {
          ...this.state.draft.address,
          state: value,
        },
      },
    });
  }

  setZip(event, value) {
    this.setState({
      draft: {
        ...this.state.draft,
        address: {
          ...this.state.draft.address,
          zipcode: value,
        },
      },
    });
  }

  setOrganization(event, value) {
    this.setState({
      draft: {
        ...this.state.draft,
        contact: {
          ...this.state.draft.contact,
          organizationName: value,
        },
      },
    });
  }

  setJobType(event, index, value) {
    this.setState({
      draft: {
        ...this.state.draft,
        businessCategories: value,
      },
    });
  }

  setWebsite(event, value) {
    this.setState({
      draft: {
        ...this.state.draft,
        contact: {
          ...this.state.draft.contact,
          website: value,
        },
      },
    });
  }

  setLine(event, value) {
    this.setState({
      draft: {
        ...this.state.draft,
        contact: {
          ...this.state.draft.contact,
          line: value,
        },
      },
    });
  }

  setExpired(event, value) {
    const expiredDate = dateToEpoch(value);

    this.setState({
      draft: {
        ...this.state.draft,
        expiredDate,
      },
    });
  }

  async handleSubmit() {
    try {
      await postJob(this.state.draft);

      this.setState({
        ...this.state,
        notificationMessage: 'Job was created successfully.',
      });
    } catch (e) {
      this.setState({
        ...this.state,
        notificationMessage: 'There is a problem to create job.',
      });
    }
  }

  handleSnackbarClose() {
    this.setState({
      ...this.state,
      notificationMessage: '',
    });
  }

  render() {
    const { subTitle, description, submitBtn, jobTypes } = styles;
    const { draft, notificationMessage } = this.state;

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
              onChange={this.setDescription}
            />
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <SelectField
              multiple
              floatingLabelText="Job type*"
              value={draft.businessCategories}
              onChange={this.setJobType}
            >
              {
                JOB_TYPES.map((type) => {
                  const busType = draft.businessCategories;
                  return (<MenuItem
                    key={type}
                    style={jobTypes}
                    value={type}
                    primaryText={type}
                    checked={busType.includes(type)}
                  />);
                })
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
              onChange={this.setName}
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
              onChange={this.setPhone}
            />
          </Col>
          <Col md="6">
            <TextField
              hintText="Email"
              floatingLabelText="Email"
              floatingLabelFixed
              fullWidth
              onChange={this.setEmail}
            />
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <div style={subTitle}>Optional Fields</div>
            <TextField
              hintText="Please fill address 1"
              floatingLabelText="Address 1"
              floatingLabelFixed
              fullWidth
              onChange={this.setAddress1}
            />
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <TextField
              hintText="Please fill address 2"
              floatingLabelText="Address 2"
              floatingLabelFixed
              fullWidth
              onChange={this.setAddress2}
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
              onChange={this.setCity}
            />
          </Col>
          <Col md="4">
            <TextField
              hintText="State"
              floatingLabelText="State"
              floatingLabelFixed
              fullWidth
              onChange={this.setCountryState}
            />
          </Col>
          <Col md="4">
            <TextField
              hintText="Zipcode"
              floatingLabelText="Zipcode"
              floatingLabelFixed
              fullWidth
              onChange={this.setZip}
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
              onChange={this.setOrganization}
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
              onChange={this.setWebsite}
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
              onChange={this.setLine}
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
              onChange={this.setExpired}
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
        <Snackbar
          open={!!notificationMessage.length}
          message={notificationMessage}
          autoHideDuration={4000}
          onRequestClose={this.handleSnackbarClose}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  data: state,
});

export default connect(mapStateToProps)(CreateJob);
