import React from "react";
import {Redirect, Route} from "react-router-dom";
import {connect} from 'react-redux';

function PrivateRoute({ children, isLoggedIn, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isLoggedIn ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.user !== undefined
    }
};


export default connect(mapStateToProps)(PrivateRoute);
