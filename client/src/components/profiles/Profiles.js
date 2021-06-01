import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../Spiner";
import { getProfiles } from "../../actions/profile";
import ProfilesItem from "./ProfilesItem";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Paper } from "@material-ui/core";
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
    color: theme.palette.text.secondary,
  },
}));
function Profiles({ getProfiles, profile: { profiles, loading } }) {
  const classes = useStyles();
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Container className={classes.cardGrid}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Typography variant="h4">
                    <PeopleAltIcon />
                    TimeCard User's
                  </Typography>
                  <Typography>Connect with other time card user's</Typography>
                </Paper>
              </Grid>
              {profiles.length > 0 ? (
                profiles.map((profile) => (
                  <Grid item xs={12} key={profile._id}>
                    <Paper className={classes.paper}>
                      <ProfilesItem profile={profile} />
                    </Paper>
                  </Grid>
                ))
              ) : (
                <h4>No Profiles Found</h4>
              )}
            </Grid>
          </Container>
        </Fragment>
      )}
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
