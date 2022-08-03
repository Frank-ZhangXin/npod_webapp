import React, { useState, useEffect } from "react";
import { Auth, API } from "aws-amplify";

export default function useEnable(
  nameList,
  enableClicked,
  setUserData,
  setUserRows,
  setUserCount,
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
          listUsers(null, null)
            .then((res) => {
              console.log("list all users: sucess");
              // res is a 2D array, each sub-array is users fetched in each round of recursion
              let userList = res.reduce((merge, userSubList) => {
                return [...merge, ...userSubList];
              }, []);
              setUserData(userList);
              setUserCount(userList.length);
              setUserRows(createRows(userList));
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

  async function listUsers(limit, nextToken, allUsers = []) {
    let apiName = "AdminQueries";
    let path = "/listUsers";
    let myInit = {
      queryStringParameters: {
        limit: limit,
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
    allUsers.push(rest.Users);
    nextToken = NextToken;

    // recursion to exhausting all users
    if (nextToken) {
      return listUsers(limit, nextToken, allUsers);
    } else {
      return allUsers;
    }
  }

  return result;
}
