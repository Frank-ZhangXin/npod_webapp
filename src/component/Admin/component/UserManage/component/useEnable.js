import React, { useState, useEffect } from "react";
import { Auth, API } from "aws-amplify";

export default function useEnable(
  nameList,
  enableClicked,
  setUserData,
  setUserRows,
  createRows
) {
  let result;
  useEffect(() => {
    for (const idx in nameList) {
      const name = nameList[idx];
      let err;
      const disableRes = enableUser(name)
        .then((res) => {
          console.log("successfully enabled: ", name);
          result = true;
          // update user list
          const listRes = listUsers(59);
          listRes
            .then((res) => {
              console.log("list all users: sucess");
              setUserData(res.Users);
              setUserRows(createRows(res.Users));
            })
            .catch((err) => console.error("list all users error: ", err));
        })
        .catch((error) => {
          console.error("failed to enable user: " + name, error);
          err = error;
          result = false;
        });
      if (err) {
        break;
      }
    }
  }, [enableClicked]);

  async function enableUser(name, nextToken = null) {
    console.log("Enabling user ", name);
    let apiName = "AdminQueries";
    let path = "/enableUser";
    let myInit = {
      body: {
        username: name,
        token: nextToken,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${(await Auth.currentSession())
          .getAccessToken()
          .getJwtToken()}`,
      },
    };
    const { NextToken, ...rest } = await API.post(apiName, path, myInit);
    nextToken = NextToken;
    return rest;
  }

  async function listUsers(count, nextToken = null) {
    console.log("listing all users after enable user");
    let apiName = "AdminQueries";
    let path = "/listUsers";
    let myInit = {
      body: {
        token: nextToken,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${(await Auth.currentSession())
          .getAccessToken()
          .getJwtToken()}`,
      },
    };
    const { NextToken, ...rest } = await API.get(apiName, path, myInit);
    nextToken = NextToken;
    return rest;
  }

  return result;
}
