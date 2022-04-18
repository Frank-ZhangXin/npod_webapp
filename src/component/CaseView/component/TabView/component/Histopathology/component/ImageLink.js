import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${
      process.env.PUBLIC_URL +
      "/assets/hitopathologyImages/histopathology_1.png"
    })`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  root2: {
    backgroundImage: `url(${
      process.env.PUBLIC_URL +
      "/assets/hitopathologyImages/histopathology_2.png"
    })`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  centerGridContainer1: {
    height: "66vh",
  },
  centerGridContainer2: {
    height: "66vh",
    justifyContent: "flex-grow",
    alignItems: "center",
  },
  centerGridItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  centerGridItem2: {
    backgroundColor: "rgba(255,255,255, 0.5)",
    width: "100%",
    color: "black",
    marginBottom: "53%",
    justifyContent: "center",
    alignItems: "center",
  },
  centerGridItem3: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    margin: "5px",
  },
  centerText: {
    backgroundColor: "rgba(255,255,255, 0.5)",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "5px",
  },
}));

function ImageLink({ type, exist, urlLinks }) {
  const classes = useStyles();
  return (
    <div>
      {type === "Immunohistochemistry" ? (
        <div className={classes.root}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.centerGridContainer1}
          >
            <Grid item className={classes.centerGridItem}>
              <div className={classes.centerText}>
                <Typography variant="h5">
                  Immunohistochemistry Images
                </Typography>
              </div>
              <div>
                {exist ? (
                  urlLinks.map((url) => (
                    <Button
                      target="_blank"
                      variant="contained"
                      color="primary"
                      href={url}
                    >
                      nPOD Online Pathology
                    </Button>
                  ))
                ) : (
                  <Button variant="contained">Not Available</Button>
                )}
              </div>
            </Grid>
          </Grid>
        </div>
      ) : (
        <div className={classes.root2}>
          <Grid
            container
            direction="column"
            className={classes.centerGridContainer2}
          >
            <Grid item className={classes.centerGridItem2}>
              <p style={{ marginLeft: "35%" }}>LIMITED CASES ONLY</p>
            </Grid>
            <Grid item className={classes.centerGridItem3}>
              <div className={classes.centerText}>
                <Typography variant="h5">Electron Microscopy Images</Typography>
              </div>
              <div className={classes.buttonList}>
                {exist ? (
                  urlLinks.map((url, idx) => (
                    <Button
                      target="_blank"
                      variant="contained"
                      color="primary"
                      href={url}
                      className={classes.button}
                    >
                      NANOTOMY {idx + 1}
                    </Button>
                  ))
                ) : (
                  <Button variant="contained">Not Available</Button>
                )}
              </div>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}

export default ImageLink;
