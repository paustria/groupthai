import React, { Component} from 'react';
import { connect } from 'react-redux';
import Form from 'components/Form';
import auth from 'utils/auth';
import { login } from 'actions';

class Login extends Component {
    render() {
        const dispatch = this.props.dispatch;
        const { formState, currentlySending } = this.props.data;
        return (
            <div className="row">
                <div className="col-sm-2 col-sm-offset-5">
                    <div className="text-center">
                        <h2>Login</h2>
                        {/* While the form is sending, show the loading indicator,
                            otherwise show "Log in" on the submit button */}
                        <div className="form-error alert alert-danger hide"></div>
                        <Form data={formState} dispatch={dispatch} location={location}
                            history={this.props.history} onSubmit={this._login.bind(this)} btnText={'Login'} currentlySending={currentlySending}/>
                        <a href="/auth/facebook">Test facebook login</a>
                    </div>
                </div>
            </div>
        );
    }

    _login(username, password) {
        this.props.dispatch(login(username, password));
    }
}

const mapStateToProps = (state) => ({
    data: state
});

export default connect(mapStateToProps)(Login);
