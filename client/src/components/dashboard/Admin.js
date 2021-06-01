import React, { Fragment, useEffect, useState } from "react";
import Spiner from "../Spiner";
import { connect } from "react-redux";
import { getUsers } from "../../actions/auth";
import { makeStyles } from "@material-ui/core/styles";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import { Link, Redirect } from "react-router-dom";
import {
  Container,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import TablePagination from "@material-ui/core/TablePagination";
import SelectRole from "../profile-form/SelectRole";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
}));
function Admin({ getUsers, auth: { isAuthenticated, loading, users, user } }) {
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  if (!isAuthenticated && user.role !== "admin" && user.role !== "manager") {
    return <Redirect to="/dashboard" />;
  }
  return loading ? (
    <Spiner />
  ) : (
    <Fragment>
      <Container className={classes.cardGrid}>
        <Grid container spacing={1}>
          {" "}
          <Grid item xs={12}>
            <Paper className="dashboard-header">
              <Typography variant="h4">
                <LibraryBooksIcon />
                ADMIN
              </Typography>
              <Typography component="p">Assign roles to users</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Link to="/dashboard" className="btn btn-danger float-right">
                back
              </Link>
              <Typography>All USERS</Typography>
              <br />
              <Divider />
              <br />
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>NAME</TableCell>

                      <TableCell align="left">ROLE</TableCell>
                      <TableCell align="left">ACTION</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {users
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row._id}
                          >
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.role}</TableCell>
                            <TableCell><SelectRole user={row} /></TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getUsers })(Admin);
