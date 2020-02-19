import React from 'react';
import {connect} from 'react-redux';

import {BrowserRouter, Switch, Route} from "react-router-dom";

import './app.scss';
import PrivateRoute from './private-route';

import DogosGrid from "./screens/all-dogos-screen";
import FavoriteDogos from "./screens/favorite-dogos-screen";
import Login from "./screens/login-screen";

import Header from "./screens/header";

const App = ({isAuthInitDone}) => {

    return (
        <div className="app">
            {isAuthInitDone ?
                <BrowserRouter>
                    <Header />
                    <Switch>
                        <PrivateRoute path="/favorites">
                            <FavoriteDogos/>
                        </PrivateRoute>
                        <Route path="/login">
                            <Login/>
                        </Route>
                        <Route path="/">
                            <DogosGrid/>
                        </Route>
                    </Switch>
                </BrowserRouter>
                :
                <h2 className="app--loading">Loading...</h2>
            }
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        isAuthInitDone: state.user.isAuthInitDone,
    }
};

export default connect(mapStateToProps)(App);
