import "./App.css";
import React, { useState, useEffect } from "react";
import Amplify, { API, Hub, Auth } from "aws-amplify";
import config from "./aws-exports";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Header from "./component/Header";
import Body from "./component/Body";
import AuthHeader from "./component/AuthHeader";
import SignIn from "./route/SignIn";
import SignUp from "./route/SignUp";
import SignUpConfirm from "./route/SignUpConfirm";
import { connect } from "react-redux";
import ForgotPassword from "./route/ForgotPassword";
import ExplorePage from "./route/ExplorePage";

Amplify.configure({
  ...config,
  Auth: {
    mandatorySignIn: true,
  },
});

function App(props) {
  useEffect(() => {
    checkAuth();
    authListener();
  }, []);

  async function checkAuth() {
    try {
      const authRes = await Auth.currentAuthenticatedUser();
      props.setSignedIn(true);
    } catch (error) {
      console.log(error);
      props.setSignedIn(false);
    }
  }

  async function authListener() {
    Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signIn":
          console.log("User signed in.");
          break;
        case "signOut":
          console.log("User signed out.");
          break;
        default:
          break;
      }
    });
  }

  return (
    <Router>
      <div>
        <Route exact path="/">
          <Header location="Home" />
          <Body />
        </Route>
      </div>
      <Route path="/signin">
        <AuthHeader location="Sign In" />
        <SignIn />
      </Route>
      <Route path="/signup">
        <AuthHeader location="Sign Up" />
        <SignUp />
      </Route>
      <Route path="/signupconfirm/:user">
        <AuthHeader location="Sign Up Confirm" />
        <SignUpConfirm />
      </Route>
      <Route path="/forgotpassword">
        <AuthHeader location="Forgot Password" />
        <ForgotPassword />
      </Route>
      <Route path="/explore">
        <Header location="Case Explore" />
        <ExplorePage />
      </Route>
    </Router>
  );
}

// Subscribe
const mapStateToProps = (state) => {
  return {
    signedIn: state.auth.signedIn,
  };
};

// Update
const mapDispatchToProps = (dispatch) => {
  return {
    setSignedIn: (newSignedIn) =>
      dispatch({ type: "SET_SIGNEDIN", value: newSignedIn }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
