import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import DonorSummary from "./component/DonorSummary/DonorSummary";

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
  },
  tabPanel: {
    height: "67vh",
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
          <Tab label="DONOR SUMMARY" {...a11yProps(0)} />
          <Tab label="CLINIC HISTORY" {...a11yProps(1)} />
          <Tab label="Case Processing &amp; Tissue Quality" {...a11yProps(2)} />
          <Tab label="FUNCTIONAL ASSAY" {...a11yProps(3)} />
          <Tab label="HISTOPATHOLOGY" {...a11yProps(4)} />
          <Tab label="IMMUNOPHENOTYPING" {...a11yProps(5)} />
        </Tabs>
        <div className={classes.tabPanel}>
          <TabPanel value={value} index={0}>
            <DonorSummary />
          </TabPanel>
          <TabPanel value={value} index={1}>
            placeholder
          </TabPanel>
          <TabPanel value={value} index={2}>
            placeholder
          </TabPanel>
          <TabPanel value={value} index={3}>
            placeholder
          </TabPanel>
          <TabPanel value={value} index={4}>
            placeholder
          </TabPanel>
          <TabPanel value={value} index={5}>
            placeholder
          </TabPanel>
        </div>
      </Paper>
    </div>
  );
}
