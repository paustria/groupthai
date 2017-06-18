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

const initialState = {
};

const styles = {
  subTitle: { fontSize: '2rem', paddingTop: '20px' },
  description: { paddingTop: '20px' },
  submitBtn: { margin: '20px 0' },
};

class CreateJob extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    // TODO :: Do something.
    this.setState();
  }

  render() {
    const { subTitle, description, submitBtn } = styles;

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
              onChange={event =>
                this.setState({ keyword: event.target.value })}
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
              value={this.state.value}
              onChange={this.handleChange}
            >
              <MenuItem value={1} primaryText="Restaurant" />
              <MenuItem value={2} primaryText="Nursing" />
              <MenuItem value={3} primaryText="Massage" />
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
