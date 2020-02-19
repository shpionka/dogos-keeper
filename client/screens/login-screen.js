import React from 'react';
import firebase from "firebase";
import {useHistory, useLocation} from 'react-router-dom';

import {connect} from 'react-redux';
import {authUserLoginStart, authUserLoginSuccess, authUserLoginFail} from "../redux/action-creators/user-actions";
import Button from "../components/button";

import './login-screen.scss';

function loginWithPopup({authUserLoginStart, authUserLoginSuccess, authUserLoginFail}, history, from){
    return () => {
        authUserLoginStart();
        const provider = new firebase.auth.GithubAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            const user = result.user;
            authUserLoginSuccess(user);
            history.replace(from);
        }).catch(function(error) {
            console.error("Could not sign in!", error);
            authUserLoginFail(error);
        });
    }
}

const LoginScreen = (props) => {
    const history = useHistory();
    const location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    return (
        <div className='dogo-login-page'>
            <div className={'dogo-login-box'}>
                <h2>Login page</h2>
                <Button variant={"success"} onClick={loginWithPopup(props, history, from)}>
                    <i className="fab fa-github"></i> Login with Github
                </Button>
            </div>
        </div>
    )
};


const mapDispatchToProps = (dispatch) => {
    return {
        authUserLoginStart: () => dispatch(authUserLoginStart()),
        authUserLoginSuccess: (user) => dispatch(authUserLoginSuccess(user)),
        authUserLoginFail: (error) => dispatch(authUserLoginFail(error)),
    }
};

export default connect(null, mapDispatchToProps)(LoginScreen);
