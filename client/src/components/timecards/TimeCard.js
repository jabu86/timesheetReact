import React, { Fragment, useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { getTimecards, deleteTimecard } from "../../actions/timecards";
import Spiner from "../Spiner";
import AddTimeCard from "./AddTimeCard";
import AllTimeCards from "./AllTimeCards";
import Filter from "./TimeUserCardCount";
import TablePagination from "@material-ui/core/TablePagination";
import { Paper } from "@material-ui/core";


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

function TimeCard({ getTimecards, timecard: { loading, filteredTimecards } }) {
  const classes = useStyles();
   //new pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    getTimecards();
  }, [getTimecards]);
  return (
    <Fragment>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={1}>
          {loading ? (
            <Spiner />
          ) : (
            <Fragment>
              <Grid item xs={12}>
                <AddTimeCard />
                <br />
                <Filter />
              </Grid>
              {filteredTimecards &&
                filteredTimecards !== null &&
                filteredTimecards
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((timecard) => (
                    <AllTimeCards timecard={timecard} key={timecard._id} />
                  ))}
            </Fragment>
          )}
        </Grid>
        <Grid item>
          <Paper>
            <TablePagination
              rowsPerPageOptions={[6, 12, 18]}

              count={filteredTimecards.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Container>
    </Fragment>
  );
}
const mapStateToProps = (state) => ({
  timecard: state.timecard,
});
export default connect(mapStateToProps, { getTimecards, deleteTimecard })(
  TimeCard
);
