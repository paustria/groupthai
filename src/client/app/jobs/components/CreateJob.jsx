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
      phone: '',
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
  errorMessage: {
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
      phone: '',
      email: '',
      website: '',
      lineID: '',
    },
    expiredDate: 0,
    createdBy: '',
    updatedBy: '',
    businessCategories: '',
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
  state = initialState;

  handleChange = (event, value, field, subfield) => {
    let errorMessage = '';
    let formatValue = value;

    // DatePicker event will be null.
    // SelectField doesn't attach required attributes.
    if ((event && event.target.attributes.getNamedItem('required')) ||
        field === 'businessCategories') {
      errorMessage = value.length ? '' : 'This field is required.';
    }

    if (subfield) {
      this.setState({
        draft: {
          ...this.state.draft,
          [field]: {
            ...this.state.draft[field],
            [subfield]: formatValue,
          },
        },
        errorMessage: {
          ...this.state.errorMessage,
          [field]: {
            ...this.state.errorMessage[field],
            [subfield]: errorMessage,
          },
        },
      });

      return;
    }

    if (field === 'description' && value.length) {
      formatValue = value.replace(/(?:\r\n|\r|\n)/g, '<br />');
    }

    if (field === 'expiredDate' && !!value) {
      formatValue = dateToEpoch(value);
    }

    this.setState({
      draft: {
        ...this.state.draft,
        [field]: formatValue,
      },
      errorMessage: {
        ...this.state.errorMessage,
        [field]: errorMessage,
      },
    });
  }

  validateForm() {
    const {
      title,
      description,
      contact,
      businessCategories,
    } = this.state.draft;

    if (title.length === 0) {
      this.setState({
        errorMessage: {
          ...this.state.errorMessage,
          title: 'Job Title should not be empty.',
        },
      });
    }

    if (
      title.length === 0 ||
      description.length === 0 ||
      businessCategories.length === 0 ||
      contact.name.length === 0
    ) {
      return false;
    }

    return true;
  }

  handleSubmit = async () => {
    if (!this.validateForm()) {
      return;
    }

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

  handleSnackbarClose = () => {
    this.setState({
      ...this.state,
      notificationMessage: '',
    });
  }

  render() {
    const { subTitle, description, submitBtn, jobTypes } = styles;
    const { draft, notificationMessage, errorMessage } = this.state;

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
              required
              onChange={(event, value) => this.handleChange(event, value, 'title')}
              errorText={errorMessage.title}
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
              required
              onChange={(event, value) => this.handleChange(event, value, 'description')}
              errorText={errorMessage.description}
            />
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <SelectField
              multiple
              floatingLabelText="Job type*"
              value={draft.businessCategories}
              onChange={(event, index, value) => this.handleChange(event, value, 'businessCategories')}
              required
              errorText={errorMessage.businessCategories}
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
              required
              onChange={(event, value) => this.handleChange(event, value, 'contact', 'name')}
              errorText={errorMessage.contact.name}
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
              onChange={(event, value) => this.handleChange(event, value, 'contact', 'phone')}
            />
          </Col>
          <Col md="6">
            <TextField
              hintText="Email"
              floatingLabelText="Email"
              floatingLabelFixed
              fullWidth
              onChange={(event, value) => this.handleChange(event, value, 'contact', 'email')}
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
              onChange={(event, value) => this.handleChange(event, value, 'address', 'address1')}
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
              onChange={(event, value) => this.handleChange(event, value, 'address', 'address2')}
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
              onChange={(event, value) => this.handleChange(event, value, 'address', 'city')}
            />
          </Col>
          <Col md="4">
            <TextField
              hintText="State"
              floatingLabelText="State"
              floatingLabelFixed
              fullWidth
              onChange={(event, value) => this.handleChange(event, value, 'address', 'state')}
            />
          </Col>
          <Col md="4">
            <TextField
              hintText="Zipcode"
              floatingLabelText="Zipcode"
              floatingLabelFixed
              fullWidth
              onChange={(event, value) => this.handleChange(event, value, 'address', 'zipcode')}
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
              onChange={(event, value) => this.handleChange(event, value, 'contact', 'organizationName')}
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
              onChange={(event, value) => this.handleChange(event, value, 'contact', 'website')}
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
              onChange={(event, value) => this.handleChange(event, value, 'contact', 'lineID')}
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
              onChange={(event, value) => this.handleChange(event, value, 'expiredDate')}
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
