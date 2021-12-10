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
  centerGrid: {
    height: "66vh",
  },
  centerItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
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

function ImageLink({ type, exist, urlLink }) {
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
            className={classes.centerGrid}
          >
            <Grid item className={classes.centerItem}>
              <div className={classes.centerText}>
                <Typography variant="h5">
                  Immunohistochemistry Images
                </Typography>
              </div>
              <div>
                {exist ? (
                  <Button
                    target="_blank"
                    variant="contained"
                    color="primary"
                    href={urlLink}
                  >
                    Aperio
                  </Button>
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
            justify="center"
            alignItems="center"
            className={classes.centerGrid}
          >
            <Grid item className={classes.centerItem}>
              <div className={classes.centerText}>
                <Typography variant="h5">Electron Microscopy Images</Typography>
              </div>
              <div>
                {exist ? (
                  <Button
                    target="_blank"
                    variant="contained"
                    color="primary"
                    href={urlLink}
                  >
                    OpenMicroscopy
                  </Button>
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
