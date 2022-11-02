import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import { connect } from "react-redux";
import DatasetSubmit from "../component/Dataset/DatasetSubmit/DatasetSubmit";

function DatasetSubmitPage(props) {
  const history = useHistory();
  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const authRes = await Auth.currentAuthenticatedUser();
      console.log("Check auth response ", authRes);
      console.log(
        "user group",
        authRes.signInUserSession.accessToken.payload["cognito:groups"][0]
      );
      if (
        authRes.signInUserSession.accessToken.payload["cognito:groups"][0] ===
        "dataset_user"
      ) {
        console.log("Welcome to dataset page!");
      } else {
        history.push("/");
        console.log(
          "Dataset page accessing is failed, since you are not dataset user."
        );
      }
    } catch (error) {
      console.log(error);
      history.push("/signin");
    }
  }

  return <div>{props.signedIn ? <DatasetSubmit /> : null}</div>;
}

// Subscribe
const mapStateToProps = (state) => {
  return {
    signedIn: state.auth.signedIn,
  };
};

export default connect(mapStateToProps)(DatasetSubmitPage);
