import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from 'muicss/lib/react/container';
import { Tabs, Tab } from 'material-ui/Tabs';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CreateJob from 'app/jobs/components/CreateJob';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  form: { marginLeft: 20 },
  formTitle: {
    paddingTop: 20,
    marginBottom: 0,
  },
  formBtn: { margin: 20 },
};

const initialState = {
  displayName: '',
  displayNameError: '',
  email: '',
  emailError: '',
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  render() {
    const { user } = this.props;

    const profileTab = user ? (
      <Container>
        <Row>
          <Col md="12">
            <div>
              <TextField
                floatingLabelText="Display Name"
                errorText={this.state.displayNameError}
                hintText="Please enter your display name"
                fullWidth
                value={user.displayName}
                onChange={
                  e => this.setState(
                    {
                      displayName: e.target.value,
                      displayNameError: '',
                    },
                  )
                }
              />
              <TextField
                floatingLabelText="Email"
                errorText={this.state.emailError}
                hintText="Please enter your email"
                fullWidth
                value={user.email}
                onChange={
                  e => this.setState(
                    {
                      email: e.target.value,
                      emailError: '',
                    },
                  )
                }
              />
              <div style={styles.formBtn} className="mui--text-center">
                <RaisedButton label="Update" primary />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    ) : <div />;

    return user ? (<Container>
      <h1>Dashboard</h1>
      <Tabs>
        { !user.isFacebook && <Tab label="Profile" >{profileTab}</Tab>}
        <Tab label="Post Jobs" >
          <CreateJob />
        </Tab>
      </Tabs>
    </Container>) : <div />;
  }
}

Dashboard.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  user: state.app.user,
});

export default connect(mapStateToProps)(Dashboard);
