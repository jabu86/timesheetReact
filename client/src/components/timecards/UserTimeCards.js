import React, { Fragment, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { getUserTimecards } from "../../actions/timecards";
import Spiner from "../Spiner";
import AllTimeCards from "./AllTimeCards";
import Pagination from "./Paginationate";
import AddTimeCard from "./AddTimeCard";
import Filter from "./TimeUserCardCount";
const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "0.5em",
  },

  cardContent: {
    flexGrow: 1,
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

function UserTimeCard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const timecardList = useSelector((state) => state.timecardList);
  const { loading, error, timecards, filteredTimecards } = timecardList;
  const { isAuthenticated, user } = auth;
  useEffect(() => {
    dispatch(getUserTimecards(user._id));
  }, [dispatch, getUserTimecards, user._id]);
  return (
    <Fragment>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={1}>
          {loading ? (
            <Spiner />
          ) : error ? (
            <h3>{error}</h3>
          ) : (
            <>
              <Grid item xs={12}>
                {isAuthenticated ? <AddTimeCard /> : ""}
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

export default UserTimeCard;
