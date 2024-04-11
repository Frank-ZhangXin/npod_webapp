import React from "react";
import { connect } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import InfoIcon from "@mui/icons-material/Info";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  title: {
    paddingBottom: theme.spacing(2),
  },
  title2: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  container: {
    maxHeight: "56vh",
  },
  table: {
    paddingBottom: theme.spacing(2),
  },
  note: {
    maxHeight: "25vh",
    overflow: "auto",
  },
  noteText: {
    padding: "10px",
  },
  infoIcon: {
    fontSize: 10,
    marginLeft: "3px",
    color: "#0292FF",
  },
  infoText: {
    padding: "10px",
    textShadow: "0 0 20px white",
  },
}));

const GeneticTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    color: "#000000",
    border: "1px solid #dadde9",
    maxWidth: "420px",
    fontSize: 15,
  },
}))(Tooltip);

function GRS2Snps(props) {
  const classes = useStyles();
  const genetic = props.geneticMap[props.currentCase.case_id];

  function createData(name, value) {
    return { name, value };
  }

  const rows = [];

  const genRows = (snpsStr) => {
    const snpsArr = snpsStr.split(";");
    snpsArr.forEach((snpStr) => {
      let snpKey = snpStr.split(":")[0] ?? "Not Available";
      const snpValue = snpStr.split(":")[1] ?? "Not Available";
      const prefix = "GRS2_";
      snpKey = snpKey.replace(new RegExp("^" + prefix), "");
      rows.push(createData(snpKey, snpValue));
    });
  };

  try {
    genRows(genetic.GRS2_SNPs);
  } catch (err) {
    console.log("Fetching genetic SNPs data error", err);
    rows.push(createData("Unavailable", "Unavailable"));
  }

  const genGenInfo = (snpName, grs) => {
    let infoText = "SNP";
    Object.keys(props.SNP).forEach((SNP_id) => {
      let snpObj = props.SNP[SNP_id];
      if (snpObj.SNP_name === snpName && snpObj.GRS === grs) {
        let gene1 = snpObj?.gene_1;
        let gene2 = snpObj?.gene_2;
        let gene3 = snpObj?.gene_3;
        infoText = (
          <React.Fragment>
            <div className={classes.infoText}>
              Gene 1: {gene1}
              {gene2 ? <div>Gene 2: {gene2}</div> : null}
              {gene3 ? <div>Gene 3: {gene3}</div> : null}
            </div>
          </React.Fragment>
        );
      }
    });
    return infoText;
  };

  return (
    <div>
      <div>
        <Typography variant="h5" className={classes.title}>
          GRS2 SNPs
        </Typography>
      </div>
      <div>
        <TableContainer component={Paper} className={classes.container}>
          <Table className={classes.table} size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}{" "}
                    {row.value !== "Unavailable" ? (
                      <GeneticTooltip
                        title={genGenInfo(row.name, "GRS2")}
                        placement="right"
                      >
                        <InfoOutlinedIcon
                          sx={{ fontSize: 16, color: "#0292FF" }}
                        />
                      </GeneticTooltip>
                    ) : null}
                  </TableCell>
                  <TableCell align="right">{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

// Subscribe
const mapStateToProps = (state) => {
  return {
    // Filtered Data
    currentCase: state.explore.currentCase,

    // Donor Types (map)
    donorTypesMap: state.explore.donorTypesMap,

    // genetic map
    geneticMap: state.explore.geneticMap,

    // SNP-gene
    SNP: state.explore.SNP,
  };
};

export default connect(mapStateToProps, null)(GRS2Snps);
