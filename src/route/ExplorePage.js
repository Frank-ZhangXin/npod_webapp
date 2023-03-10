import React, { useEffect, useState } from "react";
import Explore from "../component/Explore/Explore";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Amplify, { API, Hub, Auth } from "aws-amplify";

function ExplorePage(props) {
  const history = useHistory();
  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const authRes = await Auth.currentAuthenticatedUser();
      props.setSignedIn(true);
    } catch (error) {
      console.log(error);
      props.setSignedIn(false);
      history.push("/signin");
    }
  }
  let { caseId } = useParams();
  console.log("On explore page, requested case id", caseId);

  return (
    <div>{props.signedIn ? <Explore requestedCaseId={caseId} /> : null}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ExplorePage);
