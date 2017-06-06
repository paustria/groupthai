import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { auth } from 'utils/auth';
import app from 'app';

const styles = {
  jumbotron: {
    background: 'url("img/landing.jpg") center center',
    color: 'white',
    height: '600px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noMargin: {
    margin: '0px',
  },
};

async function fetchUser() {
  const response = await fetch('/user', { credentials: 'same-origin' });
  const res = await response.json();

  return res.user;
}

class Home extends Component {
  async componentDidMount() {
    if (this.props.location.search.indexOf('facebook') > -1) {
      const user = await fetchUser();
      if (user) {
        auth.setAuth(true);
        this.props.login(user);
      }
    }
  }
  render() {
    return (
      <div>
        <div style={styles.jumbotron}>
          <h1 style={styles.noMargin}>Bringing Thais in USA together</h1>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  login: PropTypes.func,
};

const mapStateToProps = state => ({
  data: state,
});

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(app.actions.login(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
