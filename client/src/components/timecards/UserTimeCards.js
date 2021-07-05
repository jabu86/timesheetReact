import React, { Fragment, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { getUserTimecards } from "../../actions/timecards";
import Spiner from "../Spiner";
import AllTimeCards from "./AllTimeCards";
import Paginationate from "./Paginationate";
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

function UserTimeCard({ match }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const pageNumber = match.params.pageNumber || 1;
  const auth = useSelector((state) => state.auth);
  const timecardList = useSelector((state) => state.timecardList);
  const { loading, error, filteredTimecards, page, pages } = timecardList;
  const { isAuthenticated, user } = auth;
  useEffect(() => {
    dispatch(getUserTimecards(user._id, pageNumber));
  }, [dispatch, user._id, pageNumber]);
  return (
    <Fragment>
      <Container className={classes.cardGrid}>
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
        <br />
        <Paginationate pages={pages} page={page} userTimecards={user.role} />
      </Container>
    </Fragment>
  );
}

export default UserTimeCard;
