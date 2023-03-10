import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import { connect } from "react-redux";
import DatasetExplore from "../component/Dataset/DatasetExplore/DatasetExplore";

function DatasetExplorePage(props) {
  const history = useHistory();
  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const authRes = await Auth.currentAuthenticatedUser();
    } catch (error) {
      console.log(error);
      history.push("/signin");
    }
  }

  return <div>{props.signedIn ? <DatasetExplore /> : null}</div>;
}

// Subscribe
const mapStateToProps = (state) => {
  return {
    signedIn: state.auth.signedIn,
  };
};

export default connect(mapStateToProps)(DatasetExplorePage);
