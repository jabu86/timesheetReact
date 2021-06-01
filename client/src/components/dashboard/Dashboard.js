import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import Spinner from "../Spiner";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Container,
  Grid,
  Typography,
  Paper,
  Avatar,
} from "@material-ui/core";

import DashboardIcon from "@material-ui/icons/Dashboard";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
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
function Dashboard({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) {
  const classes = useStyles();

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Container className={classes.cardGrid}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper  className="dashboard-header">
              <Typography variant="h4">
                <DashboardIcon />
                Dashboard
              </Typography>
              <div>
                {" "}
                <Avatar src={user && user.image} alt={user && user.name} />{" "}
                <h5>Welcome {user && user.name}</h5>
              </div>
            </Paper>
          </Grid>
          {profile !== null ? (
            <Fragment>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <DashboardActions />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                  <Experience experience={profile.experience} />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                  <Education education={profile.education} />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                  <Button onClick={() => deleteAccount()} variant="contained" color="secondary">Delete My Account</Button>
                </Paper>
              </Grid>
            </Fragment>
          ) : (
            <Fragment>
              <Grid container>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <p>
                      You have not yet setup a profile, please and some info
                    </p>
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      size="large"
                    >
                      <Link to="/create-profile">
                        <Typography variant="h5">Create Profile</Typography>
                      </Link>
                    </Button>
                  </Paper>
                </Grid>
              </Grid>
            </Fragment>
          )}
        </Grid>
      </Container>
    </Fragment>
  );
}

Dashboard.propTypes = {};
const mapStatToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStatToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
