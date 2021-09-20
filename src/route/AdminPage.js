import React, { useEffect, useState } from "react";
import Admin from "../component/Admin/Admin";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";

export default function AdminPage() {
  const [adminAccess, setAdminAccess] = useState(false);
  const history = useHistory();
  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const authRes = await Auth.currentAuthenticatedUser();
      console.log("Check auth response ", authRes);
      if (authRes["username"] === "testuser") {
        setAdminAccess(true);
        console.log("Welcome to admin page!");
      } else {
        setAdminAccess(false);
        history.push("/");
        console.log("Admin page accessing is failed, since you are not admin.");
      }
    } catch (error) {
      setAdminAccess(false);
      console.log("Check Auth error ", error);
      history.push("/");
      console.log("Admin page accessing is failed, since you are not admin.");
    }
  }
  return <div>{adminAccess ? <Admin /> : null}</div>;
}
