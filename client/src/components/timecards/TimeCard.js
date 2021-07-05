import React, { Fragment, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { getTimecards } from "../../actions/timecards";
import Spiner from "../Spiner";
import AddTimeCard from "./AddTimeCard";
import AllTimeCards from "./AllTimeCards";
import Filter from "./TimeUserCardCount";
import AlertMsg from "../AlertMsg";
import { Link } from "react-router-dom";
import Paginationate from "./Paginationate";

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

function TimeCard({ match }) {
  const classes = useStyles();
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const timecard = useSelector((state) => state.timecardList);
  const auth = useSelector((state) => state.auth);
  const { filteredTimecards, loading, error, page, pages } = timecard;
  const { isAuthenticated, user } = auth;

  useEffect(() => {
    dispatch(getTimecards(pageNumber));
  }, [dispatch, pageNumber]);

  return (
    <Fragment>
      <Container className={classes.cardGrid} >
        <Grid container spacing={1}>
          {loading ? (
            <Spiner />
          ) : error ? (
            <AlertMsg />
          ) : (
            <>
              <Grid item xs={12}>
                {isAuthenticated && user ? (
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
        <br />
        <Paginationate pages={pages} page={page} userTimecards={""} />
      </Container>
    </Fragment>
  );
}

export default TimeCard;
