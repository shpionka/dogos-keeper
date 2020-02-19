import React from 'react';
import {Link} from 'react-router-dom';
import './header.scss';
import Button from "../components/button";
import firebase from "firebase";

import {useHistory} from "react-router-dom";
import {connect} from 'react-redux';
import {fetchDogos} from "../redux/action-creators/dogo-actions";
import {authUserLogout} from "../redux/action-creators/user-actions";

const onLogout = (history, authUserLogout) => () => {
    firebase.auth().signOut().then(() => {
        history.push('/login')
        authUserLogout();
    });
};
const onLogin = (history) => () => history.push('/login');

const Header = ({fetchDogos, userInfo, authUserLogout}) => {

    const history = useHistory();

    return (
        <>
            <div className="dogo-navigation top-bar" id="responsive-menu">
                <div className="top-bar-left">
                    <ul className="dogo-navigation-menu dropdown menu">
                        <li className="dogo-navigation-menu-item main">
                            <Link to="/">Dogos Keeper</Link>
                        </li>
                        <li className="dogo-navigation-menu-item">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="dogo-navigation-menu-item">
                            <Link to="/favorites">My Favorites</Link>
                        </li>
                    </ul>
                </div>
                <div className="dogo-navigation-right top-bar-right">
                    <ul className="menu">
                        <li>
                            <Button onClick={fetchDogos}>Get new dogos</Button>
                        </li>
                        <li>
                            {userInfo ?
                                <Button variant={"success"} onClick={onLogout(history, authUserLogout)}>Logout</Button>
                                :
                                <Button variant={"error"} onClick={onLogin(history)}>Login</Button>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
};

const mapStateToProps = (state) => {
    return {
        userInfo: state.user.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDogos: () => {
            dispatch(fetchDogos())
        },
        authUserLogout: () => {
            dispatch(authUserLogout());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
