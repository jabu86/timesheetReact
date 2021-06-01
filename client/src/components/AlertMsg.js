import React, { Fragment } from "react";
import { connect } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import CssBaseline from "@material-ui/core/CssBaseline";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
container:{paddingTop:'2em'},
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
function AlertMsg({ alerts }) {
const classes = useStyles();
  return (
    <Fragment>
      <CssBaseline />
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert, index) => (
          <Container className={classes.container} key={index}>
            <Grid container>
              <Grid item xs={12}>
                <Alert severity={alert.alertType} variant="filled">
                  <AlertTitle>{alert.alertType}</AlertTitle>
                  <strong>
                    <small> {alert.msg}</small>
                  </strong>
                </Alert>
              </Grid>
            </Grid>
          </Container>
        ))}
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  alerts: state.alert,
});
export default connect(mapStateToProps)(AlertMsg);
