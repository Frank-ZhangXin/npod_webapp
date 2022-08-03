import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./../../../Header";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { TableSortLabel } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import { Auth, API } from "aws-amplify";
import useDisable from "./component/useDisable";
import useEnable from "./component/useEnable";
import useConfirm from "./component/useConfirm";
import useDelete from "./component/userDelete";
import AlertDialog from "../../../AlertDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(${
      process.env.PUBLIC_URL + "/assets/adminPage/adminPage.jpg"
    })`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    paddingTop: "130px",
  },
  title: {
    paddingBottom: theme.spacing(2),
  },
  centerBox: {
    maxHeight: "80vh",
    //width: "100%",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
  centerPaper: {
    minHeight: "70vh",
    width: "80vw",
    padding: "2vh",
  },
  container: {
    marginTop: theme.spacing(4),
    maxHeight: "70vh",
    width: "100%",
  },
  buttonBox: {
    display: "flex",
    justifyContent: "flex-end",
    width: "80vw",
  },
  button: {
    marginTop: "10px",
    marginLeft: "4px",
    marginRight: "4px",
  },
  table: {
    paddingBottom: theme.spacing(2),
    //minWidth: 650,
  },
  tableRow: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  greenVal: {
    color: "green",
  },
  redVal: {
    color: "red",
  },
}));

function createData(
  username,
  email,
  email_verified,
  status,
  enabled,
  firstName,
  lastName,
  institution,
  project
) {
  return {
    username,
    email,
    email_verified,
    status,
    enabled,
    firstName,
    lastName,
    institution,
    project,
  };
}

function createRows(uData) {
  let rows = [];
  for (let i = 0; i < uData.length; i++) {
    let username = uData[i].Username;
    let email;
    let email_verified;
    uData[i].Attributes.forEach((attr) => {
      if (attr.Name === "email") {
        email = attr.Value;
      } else if (attr.Name === "email_verified") {
        email_verified = attr.Value === "true" ? "Verified" : "Not Verified";
      }
    });

    let status = uData[i].UserStatus;
    let enabled = uData[i].Enabled === true ? "Enabled" : "Disabled";
    let firstName;
    try {
      firstName = uData[i].Attributes.find(
        (attr) => attr.Name === "custom:firstname"
      ).Value;
    } catch (err) {
      firstName = "None";
    }

    let lastName;
    try {
      lastName = uData[i].Attributes.find(
        (attr) => attr.Name === "custom:lastname"
      ).Value;
    } catch (err) {
      lastName = "None";
    }

    let institution;
    try {
      institution = uData[i].Attributes.find(
        (attr) => attr.Name === "custom:institution"
      ).Value;
    } catch (err) {
      institution = "None";
    }

    let project;
    try {
      project = uData[i].Attributes.find(
        (attr) => attr.Name === "custom:project"
      ).Value;
    } catch (err) {
      project = "None";
    }

    let curRow = createData(
      username,
      email,
      email_verified,
      status,
      enabled,
      firstName,
      lastName,
      institution,
      project
    );
    rows.push(curRow);
  }
  return rows;
}

function descendingComparator(a, b, orderBy) {
  const x = String(a[orderBy]).toLowerCase();
  const y = String(b[orderBy]).toLowerCase();
  if (y < x) {
    return -1;
  }
  if (y > x) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function WriteIn() {
  const classes = useStyles();
  const [userData, setUserData] = useState();
  const [useRows, setUserRows] = useState();
  const [selected, setSelected] = useState(new Set());
  const [disableClicked, setDisableClicked] = useState(0);
  const [enableClicked, setEnableClicked] = useState(0);
  const [confirmClicked, setConfirmClicked] = useState(0);
  const [deleteClicked, setDeleteClicked] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const [detailName, setDetailName] = useState();
  const [userCount, setUserCount] = useState();
  const [orderBy, setOrderBy] = useState();
  const [order, setOrder] = useState();
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    let cycle = 1;
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
  }, []);

  const handleCheckboxClick = (event, name) => {
    const newSelected = new Set(selected);
    if (selected.has(name)) {
      newSelected.delete(name);
    } else {
      newSelected.add(name);
    }
    setSelected(newSelected);
  };

  const handleRowClick = (event, name) => {
    setShowDetail((prev) => !prev);
    setDetailName(name);
  };

  const handleDisableClick = (event) => {
    setDisableClicked((prev) => prev + 1);
  };

  const handleEnableClick = (event) => {
    setEnableClicked((prev) => prev + 1);
  };

  const handleConfirmClick = (event) => {
    setConfirmClicked((prev) => prev + 1);
  };

  const handleDeleteClick = (event) => {
    setDeleteClicked((prev) => prev + 1);
    setOpenAlert(false);
  };

  const handleSort = (property) => (event) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const isSelected = (name) => selected.has(name);

  const disableResult = useDisable(
    [...selected],
    disableClicked,
    setUserData,
    setUserRows,
    setUserCount,
    createRows
  );
  const enableResult = useEnable(
    [...selected],
    enableClicked,
    setUserData,
    setUserRows,
    setUserCount,
    createRows
  );

  const confirmResult = useConfirm(
    [...selected],
    confirmClicked,
    setUserData,
    setUserRows,
    setUserCount,
    createRows
  );
  const deleteResult = useDelete(
    [...selected],
    deleteClicked,
    setUserData,
    setUserRows,
    setUserCount,
    createRows
  );

  console.log("all user data: ", userData);

  return (
    <div>
      <Header location="Admin Page" />
      <div className={classes.root}>
        <AlertDialog
          title="Warning"
          contentText="Delete these users permanently?"
          open={openAlert}
          setOpen={setOpenAlert}
          btn1Name="Cancel"
          btn2Name="Delete"
          callBack={handleDeleteClick}
        />
        <div>
          <Box className={classes.centerBox}>
            <Box>
              <Paper className={classes.centerPaper}>
                <div>
                  <Typography variant="h4" className={classes.title}>
                    User Management
                  </Typography>
                  <Typography variant="subtitle1">
                    Tip: Click the row to show detail. Click one more time to
                    fold detail.
                  </Typography>
                  {userCount ? (
                    <Typography variant="subtitle1">
                      {userCount} users in total
                    </Typography>
                  ) : null}
                </div>
                <div>
                  <TableContainer
                    component={Paper}
                    className={classes.container}
                  >
                    <Table className={classes.table} size="small" stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell></TableCell>
                          <TableCell
                            sortDirection={
                              orderBy === "username" ? order : false
                            }
                          >
                            <TableSortLabel
                              active={orderBy === "username"}
                              direction={orderBy === "username" ? order : "asc"}
                              onClick={handleSort("username")}
                            >
                              Username
                            </TableSortLabel>
                          </TableCell>
                          <TableCell
                            sortDirection={
                              orderBy === "firstName" ? order : false
                            }
                          >
                            <TableSortLabel
                              active={orderBy === "firstName"}
                              direction={
                                orderBy === "firstName" ? order : "asc"
                              }
                              onClick={handleSort("firstName")}
                            >
                              Firstname
                            </TableSortLabel>
                          </TableCell>
                          <TableCell
                            sortDirection={
                              orderBy === "lastName" ? order : false
                            }
                          >
                            <TableSortLabel
                              active={orderBy === "lastName"}
                              direction={orderBy === "lastName" ? order : "asc"}
                              onClick={handleSort("lastName")}
                            >
                              Lastname
                            </TableSortLabel>
                          </TableCell>
                          <TableCell
                            sortDirection={orderBy === "email" ? order : false}
                          >
                            <TableSortLabel
                              active={orderBy === "email"}
                              direction={orderBy === "email" ? order : "asc"}
                              onClick={handleSort("email")}
                            >
                              Email
                            </TableSortLabel>
                          </TableCell>
                          <TableCell
                            sortDirection={
                              orderBy === "email_verified" ? order : false
                            }
                          >
                            <TableSortLabel
                              active={orderBy === "email_verified"}
                              direction={
                                orderBy === "email_verified" ? order : "asc"
                              }
                              onClick={handleSort("email_verified")}
                            >
                              Email Verified
                            </TableSortLabel>
                          </TableCell>
                          <TableCell
                            sortDirection={orderBy === "status" ? order : false}
                          >
                            <TableSortLabel
                              active={orderBy === "status"}
                              direction={orderBy === "status" ? order : "asc"}
                              onClick={handleSort("status")}
                            >
                              Status
                            </TableSortLabel>
                          </TableCell>
                          <TableCell
                            sortDirection={
                              orderBy === "enabled" ? order : false
                            }
                          >
                            <TableSortLabel
                              active={orderBy === "enabled"}
                              direction={orderBy === "enabled" ? order : "asc"}
                              onClick={handleSort("enabled")}
                            >
                              Enabled
                            </TableSortLabel>
                          </TableCell>
                        </TableRow>
                      </TableHead>

                      {/* <TableHead>
                        <TableRow>
                          <TableCell></TableCell>
                          <TableCell>Username</TableCell>
                          <TableCell align="left">Email</TableCell>
                          <TableCell align="left">Email Verified</TableCell>
                          <TableCell align="left">Status</TableCell>
                          <TableCell align="left">Enabled</TableCell>
                        </TableRow>
                      </TableHead> */}
                      <TableBody>
                        {useRows
                          ? stableSort(
                              useRows,
                              getComparator(order, orderBy)
                            ).map((row) => {
                              const isRowSelected = isSelected(row.username);
                              return (
                                <TableRow
                                  key={row.username}
                                  hover
                                  onClick={(event) =>
                                    handleRowClick(event, row.username)
                                  }
                                  className={classes.tableRow}
                                >
                                  <TableCell
                                    onClick={(event) =>
                                      handleCheckboxClick(event, row.username)
                                    }
                                  >
                                    <Checkbox checked={isRowSelected} />
                                  </TableCell>
                                  <TableCell component="th" scope="row">
                                    {showDetail &&
                                    detailName === row.username ? (
                                      <div>
                                        <b>Userame: </b>
                                        {row.username}
                                        <br></br>
                                        <b>Institution: </b>
                                        {row.institution}
                                        <br></br>
                                        <b>Project: </b>
                                        {row.project}
                                      </div>
                                    ) : (
                                      row.username
                                    )}
                                  </TableCell>
                                  <TableCell align="left">
                                    {row.firstName}
                                  </TableCell>
                                  <TableCell align="left">
                                    {row.lastName}
                                  </TableCell>
                                  <TableCell align="left">
                                    {row.email}
                                  </TableCell>
                                  <TableCell align="left">
                                    <div
                                      className={
                                        row.email_verified === "Verified"
                                          ? classes.greenVal
                                          : classes.redVal
                                      }
                                    >
                                      {row.email_verified}
                                    </div>
                                  </TableCell>
                                  <TableCell align="left">
                                    <div
                                      className={
                                        row.status === "CONFIRMED"
                                          ? classes.greenVal
                                          : classes.redVal
                                      }
                                    >
                                      {row.status}
                                    </div>
                                  </TableCell>
                                  <TableCell align="left">
                                    <div
                                      className={
                                        row.enabled === "Enabled"
                                          ? classes.greenVal
                                          : classes.redVal
                                      }
                                    >
                                      {row.enabled}
                                    </div>
                                  </TableCell>
                                </TableRow>
                              );
                            })
                          : null}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
                <Box className={classes.buttonBox}>
                  <Box>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      style={{ backgroundColor: "#339900" }}
                      onClick={handleEnableClick}
                    >
                      Enable
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      color="defult"
                      className={classes.button}
                      style={{ backgroundColor: "#ffcc00" }}
                      onClick={handleDisableClick}
                    >
                      Disable
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      style={{ backgroundColor: "#cc3300" }}
                      onClick={(event) => {
                        setOpenAlert(true);
                      }}
                    >
                      Delete
                    </Button>
                  </Box>

                  <Box>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={handleConfirmClick}
                    >
                      Confirm
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
}
