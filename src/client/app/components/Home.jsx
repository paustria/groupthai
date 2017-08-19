import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import app from 'app';

const styles = {
  jumbotron: {
    background: 'url("img/landing.jpg") center center',
    color: 'white',
    height: '600px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
  },
  noMargin: {
    margin: '0px',
  },
};

const Home = () =>
  (
    <div>
      <div style={styles.jumbotron}>
        <h1 style={styles.noMargin}>รวมกลุ่มคนไทยในอเมริกา</h1>
      </div>
    </div>
  );

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
