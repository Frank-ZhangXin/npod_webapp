import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import DonorSummary from "./component/DonorSummary/DonorSummary";
import ClinicalHistory from "./component/ClinicalHistory/ClinicalHistory";
import CaseProcessingAndTissueQuality from "./component/CaseProcessingAndTissueQuality/CaseProcessingAndTissueQuality";
import FunctionalAssay from "./component/FunctionalAssay/FunctionalAssay";
import Histopathology from "./component/Histopathology/Histopathology";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`case-tabpanel-${index}`}
      aria-labelledby={`case-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  tabs: {
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
  tab: {
    color: "rgba(0,0,0,1)",
  },
  tabPanel: {
    maxHeight: "85vh",
    overflowY: "auto",
  },
}));

function a11yProps(index) {
  return {
    id: `case-tab-${index}`,
    "aria-controls": `case-tabpanel-${index}`,
  };
}

export default function TabView() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Paper variant="outlined">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="case tabs"
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          className={classes.tabs}
        >
          <Tab
            label="DONOR SUMMARY"
            {...a11yProps(0)}
            className={classes.tab}
          />
          <Tab
            label="CLINICAL HISTORY"
            {...a11yProps(1)}
            className={classes.tab}
          />
          <Tab
            label="Case Processing &amp; Tissue Quality"
            {...a11yProps(2)}
            className={classes.tab}
          />
          <Tab
            label="FUNCTIONAL ASSAY"
            {...a11yProps(3)}
            className={classes.tab}
          />
          <Tab
            label="HISTOPATHOLOGY"
            {...a11yProps(4)}
            className={classes.tab}
          />
          <Tab
            label="IMMUNOPHENOTYPING"
            {...a11yProps(5)}
            className={classes.tab}
          />
        </Tabs>
        <div className={classes.tabPanel}>
          <TabPanel value={value} index={0}>
            <DonorSummary />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ClinicalHistory />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <CaseProcessingAndTissueQuality />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <FunctionalAssay />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <Histopathology />
          </TabPanel>
          <TabPanel value={value} index={5}>
            Incoming Feature
          </TabPanel>
        </div>
      </Paper>
    </div>
  );
}
