import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import WriteIn from "./component/WriteIn/WriteIn";
import { useHistory } from "react-router-dom";
import Header from "./../Header";

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
  writeIn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "25vw",
    width: "40vw",
    backgroundSize: "100%",
    backgroundImage: `url(${
      process.env.PUBLIC_URL + "/assets/adminPage/writein_image.jpg"
    })`,
    borderRadius: "10px",
    margin: "30px",
    border: "2px solid #949494",
    "&:hover": {
      border: "2px solid #ffffff",
      cursor: "pointer",
    },
  },
  writeInText: {
    color: "rgba(0,0,0,1)",
    textShadow: "0 0 20px white",
    fontWeight: 600,
  },
  userManage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "25vw",
    width: "40vw",
    backgroundSize: "100%",
    backgroundImage: `url(${
      process.env.PUBLIC_URL + "/assets/adminPage/usermanage_image.jpg"
    })`,
    borderRadius: "10px",
    margin: "30px",
    border: "2px solid #949494",
    "&:hover": {
      border: "2px solid #ffffff",
      cursor: "pointer",
    },
  },
  userManageText: {
    color: "rgba(255,255,255,1)",
    textShadow: "0 0 20px black",
    fontWeight: 600,
  },
  centerPad: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "55vh",
    width: "90vw",
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: "10px",
  },
  centerBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "65vh",
  },
}));

export default function Admin() {
  const classes = useStyles();
  const history = useHistory();

  // data write-in handler
  const dwiHandler = () => {
    history.push("/admin/writein");
  };

  // user manage handler
  const umHandler = () => {
    history.push("/admin/usermanage");
  };

  return (
    <div className={classes.root}>
      <Header location="Admin Page" />
      <div>
        <Box className={classes.centerBox}>
          <Box className={classes.centerPad}>
            <Box className={classes.writeIn} onClick={dwiHandler}>
              <Typography variant="h2" className={classes.writeInText}>
                EDIT DATA
              </Typography>
            </Box>
            <Box className={classes.userManage} onClick={umHandler}>
              <Typography variant="h2" className={classes.userManageText}>
                MANAGE USER
              </Typography>
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
}
