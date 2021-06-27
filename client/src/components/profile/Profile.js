import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getProfilesById } from "../../actions/profile";
import Spiner from "../Spiner";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import { Box, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Bounce from "react-reveal/Bounce";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  probtn: {
    padding: theme.spacing(0.5),
    justifyContent: "space-between",
    display: "flex",
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  avatar: {
    padding: theme.spacing(2),
  },
  large: {
    width: theme.spacing(40),
    height: theme.spacing(40),
  },
}));
function Profile({
  getProfilesById,
  profile: { profile, loading },
  auth,
  match,
}) {
  const classes = useStyles();

  useEffect(() => {
    getProfilesById(match.params.id);
  }, [getProfilesById, match.params.id]);
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spiner />
      ) : (
        <Fragment>
          <Container className={classes.cardGrid}>
            <Box component="div" className={classes.probtn}>
              {auth.isAuthenticated &&
                auth.loading === false &&
                auth.user._id === profile.user._id && (
                  <Bounce cascade top>
                    <Link
                      to="/edit-profile"
                      variant="contained"
                      color="primary"
                      className="btn btn-primary"
                    >
                      Edit Profile
                    </Link>
                  </Bounce>
                )}

              <Bounce cascade top>
                {" "}
                <Link
                  variant="contained"
                  color="primary"
                  className="btn btn-secondary"
                  to="/profiles"
                >
                  Back
                </Link>
              </Bounce>
            </Box>

            <Grid container spacing={1}>
              <Grid item xs={12}>
                <ProfileTop profile={profile} />
                <ProfileAbout profile={profile} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                  <Typography variant="h5">Experience</Typography>
                  {profile.experience.length > 0 ? (
                    <Fragment>
                      {profile.experience.map((exp) => (
                        <ProfileExperience key={exp._id} experience={exp} />
                      ))}
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Typography variant="h6">
                        No educational credentials
                      </Typography>
                    </Fragment>
                  )}
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                  <Typography variant="h5">Education</Typography>
                  {profile.education.length > 0 ? (
                    <Fragment>
                      {profile.education.map((edu) => (
                        <ProfileEducation key={edu._id} education={edu} />
                      ))}
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Typography variant="h6">
                        No experience credentials
                      </Typography>
                    </Fragment>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Fragment>
      )}
    </Fragment>
  );
}
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});
export default connect(mapStateToProps, { getProfilesById })(Profile);
