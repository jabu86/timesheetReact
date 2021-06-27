import React, { Fragment, useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { getTimecards } from "../../actions/timecards";
import Spiner from "../Spiner";
import AddTimeCard from "./AddTimeCard";
import AllTimeCards from "./AllTimeCards";
import Filter from "./TimeUserCardCount";
import TablePagination from "@material-ui/core/TablePagination";
import AlertMsg from "../AlertMsg";
import { Paper } from "@material-ui/core";
import { Link } from "react-router-dom";

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
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function TimeCard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const timecard = useSelector((state) => state.timecardList);
  const auth = useSelector((state) => state.auth);
  const { timecards, filteredTimecards, loading, error } = timecard;
  const { isAuthenticated, user } = auth;
  console.log();

  useEffect(() => {
    dispatch(getTimecards());
  }, [dispatch]);

  return (
    <Fragment>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={1}>
          {loading ? (
            <Spiner />
          ) : error ? (
            <AlertMsg />
          ) : (
            <>
              <Grid item xs={12}>
                {isAuthenticated ? (
                  <AddTimeCard />
                ) : (
                  <h4>
                    <Link to="/login">
                      <small>
                        <strong>SignIn</strong>
                      </small>
                    </Link>{" "}
                    to create a timecard
                  </h4>
                )}
                <br />
                <Filter />
              </Grid>

              {filteredTimecards &&
                filteredTimecards.map((timecard) => (
                  <AllTimeCards timecard={timecard} key={timecard._id} />
                ))}
            </>
          )}
        </Grid>
      </Container>
    </Fragment>
  );
}

export default TimeCard;
