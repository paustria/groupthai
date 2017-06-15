import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const initialState = {
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
    return (
      <Container>
        <Row>
          <Col md="12">
            <TextField
              floatingLabelText="Job Title"
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
              hintText="Please fill job description"
              floatingLabelText="Job description"
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
              floatingLabelText="Job type"
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
            <RaisedButton label="Post Job" primary onClick={this.handleSubmit} />
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
