import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import { connect } from "react-redux";
import DatasetManage from "../component/Dataset/DatasetManage/DatasetManage";

function DatasetManagePage(props) {
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

  return <div>{props.signedIn ? <DatasetManage /> : null}</div>;
}

// Subscribe
const mapStateToProps = (state) => {
  return {
    signedIn: state.auth.signedIn,
  };
};

export default connect(mapStateToProps)(DatasetManagePage);
