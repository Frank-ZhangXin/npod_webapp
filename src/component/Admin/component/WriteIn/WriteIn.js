import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./../../../Header";
import Container from "@material-ui/core/Container";
import { Box, Tab, Tabs } from "@material-ui/core";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import SingleCaseStepper from "./component/SingleCaseStepper/SingleCaseStepper";
import UploadImage from "./component/UploadImage/UploadImage";
import ImportData from "./component/ImportData/ImportData";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(${
      process.env.PUBLIC_URL + "/assets/adminPage/adminPage.jpg"
    })`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    paddingTop: "130px",
    paddingBottom: theme.spacing(5),
    display: "flex",
    justifyContent: "center",
  },
  container: {
    minWidth: "75vw",
    marginBottom: theme.spacing(5),
    padding: theme.spacing(5, 5, 1),
    backgroundColor: "white",
    borderRadius: "3px",
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  tabs: {
    marginTop: "3vh",
    marginBottom: "3vh",
    maxWidth: "480px",
    borderBottom: `1px solid ${theme.palette.divider}`,
    //background: "linear-gradient(45deg, #6588c2, #dde4f0);",
    backgroundColor: "#dde4f0",
    "& .MuiTabs-indicator": {
      //backgroundColor: "orange",
      height: 0,
    },
    "& .MuiTab-root.Mui-selected": {
      color: "black",
      backgroundColor: "#6588c2",
      fontWeight: "bold",
      //border: "1px solid #6588c2",
      // borderRadius: "4px",
    },
  },
}));

export default function WriteIn() {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Header location="Admin Page" />
      <div className={classes.root}>
        <Box className={classes.container}>
          <div className={classes.title}>
            <Typography variant="h4" component="h4">
              Data Update and Create
            </Typography>
          </div>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="write-in-tabs"
            // sx={{ borderRight: 1, borderColor: "divider" }}
            className={classes.tabs}
          >
            <Tab label="Single Case" {...a11yProps(0)} />
            <Tab label="Image File" {...a11yProps(1)} />
            <Tab label="Import Data" {...a11yProps(2)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <SingleCaseStepper />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <UploadImage />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ImportData />
          </TabPanel>
        </Box>
      </div>
    </div>
  );
}
