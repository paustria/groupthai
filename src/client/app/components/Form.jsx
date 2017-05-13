import React, { Component } from 'react';
import { changeForm } from 'app/actions';

const assign = Object.assign;

class LoginForm extends Component {
    render() {
        return(
            <form className="form-horizontal" onSubmit={this._onSubmit.bind(this)}>
                <div className="form-group">
                    <label className="col-sm-2 control-label sr-only" htmlFor="username">Username</label>
                    <div className="col-xs-12">
                        <input className="form-control" type="text" id="username" value={this.props.data.username} placeholder="username" onChange={this._changeUsername.bind(this)} autoCorrect="off" autoCapitalize="off" spellCheck="false" />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label sr-only" htmlFor="password">Password</label>
                    <div className="col-xs-12">
                        <input className="form-control" id="password" type="password" value={this.props.data.password} placeholder="••••••••••"  onChange={this._changePassword.bind(this)} />
                    </div>
                </div>
                <div className="form__submit-btn-wrapper">
                    {this.props.currentlySending ? (
                        <div>Loading...</div>
                    ) : (
                        <button className="btn btn-success" type="submit">{this.props.btnText}</button>
                    )}
                </div>
            </form>
        );
    }

    // Change the username in the app state
    _changeUsername(evt) {
        var newState = this._mergeWithCurrentState({
            username: evt.target.value
        });

        this._emitChange(newState);
    }

    // Change the password in the app state
    _changePassword(evt) {
        var newState = this._mergeWithCurrentState({
            password: evt.target.value
        });

        this._emitChange(newState);
    }

    // Merges the current state with a change
    _mergeWithCurrentState(change) {
        return assign(this.props.data, change);
    }

    // Emits a change of the form state to the application state
    _emitChange(newState) {
        this.props.dispatch(changeForm(newState));
    }

    // onSubmit call the passed onSubmit function
    _onSubmit(evt) {
        evt.preventDefault();
        this.props.onSubmit(this.props.data.username, this.props.data.password);
    }
}

export default LoginForm;
