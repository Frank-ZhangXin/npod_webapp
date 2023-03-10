import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { connect } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import DatasetDisplay from "../component/Dataset/DatasetDisplay/DatasetDisplay";

function DatasetExplorePage(props) {
  const history = useHistory();
  const [currUser, setCurrUser] = useState(null);
  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const authRes = await Auth.currentAuthenticatedUser();
      setCurrUser(authRes.username);
    } catch (error) {
      console.log(error);
      history.push("/signin");
    }
  }
  const { datasetId } = useParams();

  return (
    <div>
      {props.signedIn ? (
        <DatasetDisplay datasetId={datasetId} currUser={currUser} />
      ) : null}
    </div>
  );
}

// Subscribe
const mapStateToProps = (state) => {
  return {
    signedIn: state.auth.signedIn,
  };
};

export default connect(mapStateToProps)(DatasetExplorePage);
