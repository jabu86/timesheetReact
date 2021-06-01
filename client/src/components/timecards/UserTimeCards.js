import React, { Fragment, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
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

function UserTimeCard({
  getUserTimecards,
  timecard: { timecards, filteredTimecards, loading },
  auth: { user },
  match,
}) {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const [timecardPerPage] = useState(6);
  //Get current timecard
  const indexOfLastTimecard = currentPage * timecardPerPage;
  const indexOfFirstTimecard = indexOfLastTimecard - timecardPerPage;
  const currentTimecard = filteredTimecards.slice(
    indexOfFirstTimecard,
    indexOfLastTimecard
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  useEffect(() => {
    getUserTimecards(user._id);
  }, [getUserTimecards, user._id]);
  return (
    <Fragment>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={1}>
          {loading ? (
            <Spiner />
          ) : timecards.length <= 0 || timecards === undefined ? (
            <Fragment>
              <Typography variant="h6">
                You have no Timecard's! click<a href="/timecard">here</a>to
                create
              </Typography>
            </Fragment>
          ) : (
            <Fragment>
              <Grid item xs={12}>
                <AddTimeCard />
                <br />
                <Filter />
              </Grid>
              {filteredTimecards &&
                filteredTimecards !== null &&
                currentTimecard.map((timecard) => (
                  <AllTimeCards timecard={timecard} key={timecard._id} />
                ))}
            </Fragment>
          )}
        </Grid>
        <Grid item>
          <Pagination
            timeCardPerPage={timecardPerPage}
            totalTimeCards={filteredTimecards.length}
            paginate={paginate}
          />
        </Grid>
      </Container>
    </Fragment>
  );
}
const mapStateToProps = (state) => ({
  timecard: state.timecard,
  auth: state.auth,
});
export default connect(mapStateToProps, { getUserTimecards })(UserTimeCard);
