import React, { Fragment, useEffect } from "react";
import Hero from "./Hero";
import { connect, useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getLatestTimecards } from "../actions/timecards";
import Spiner from "./Spiner";
import AlertMsg from "./AlertMsg";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import AllTimeCards from "./timecards/AllTimeCards";
import { Link } from "react-router-dom";
import { Typography, Paper } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    marginBottom: "5px",
  },
}));

function Home({ isAuthenticated }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const timecardList = useSelector((state) => state.timecardList);
  const { loading, error, timecards } = timecardList;
  console.log(timecards);
  useEffect(() => {
    if (isAuthenticated) {
      return <Redirect to="/timecard" />;
    }
    dispatch(getLatestTimecards());
  }, [dispatch]);
  if (isAuthenticated) {
    return <Redirect to="/timecard" />;
  }
  return (
    <Fragment>
      <Hero />

      <Container className={classes.cardGrid}>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item md={6}>
              <Typography variant="h3">Latest Timcard</Typography>
            </Grid>
            <Grid item md={6}>
              <Typography className="py-3 float-right">
                <Link to="/login">
                  <small>SignIn</small>
                </Link>{" "}
                to create Timecard
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        <Grid container spacing={1}>
          {loading ? (
            <Spiner />
          ) : error ? (
            <AlertMsg />
          ) : (
            timecards &&
            timecards.map((timecard) => (
              <AllTimeCards timecard={timecard} key={timecard._id} />
            ))
          )}
        </Grid>
      </Container>
    </Fragment>
  );
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(Home);
