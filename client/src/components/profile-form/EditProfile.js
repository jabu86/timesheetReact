import React, { Fragment, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: "grid",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function EditProfile({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    bio: "",
  });
  useEffect(() => {
    getCurrentProfile();
    setFormData({
      company: loading || !profile.company ? "" : profile.company,
      website: loading || !profile.website ? "" : profile.website,
      location: loading || !profile.location ? "" : profile.location,
      status: loading || !profile.status ? "" : profile.status,
      skills: loading || !profile.skills ? "" : profile.skills.join(","),
      bio: loading || !profile.bio ? "" : profile.bio,
    });
  }, [
    loading,
    getCurrentProfile,
   
  ]);
  const { company, website, location, status, skills, bio } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <Container className={classes.cardGrid}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h4">Create Profile</Typography>
              <Typography>
                Let't get some information to make you'r profile stand out
              </Typography>
              <small>* = required field</small>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <form className={classes.form} onSubmit={onSubmit}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="status">Status Required*</InputLabel>
                  <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    onChange={(e) => onChange(e)}
                    label="Status Required*"
                    name="status"
                    value={status}
                  >
                    <MenuItem value="">
                      <em>* Select Personal Status</em>
                    </MenuItem>
                    <MenuItem value="Developer">Developer</MenuItem>
                    <MenuItem value="Junior Developer">
                      Junior Developer
                    </MenuItem>
                    <MenuItem value="Senior Developer">
                      Senior Developer
                    </MenuItem>
                    <MenuItem value="Manager">Manager</MenuItem>
                    <MenuItem value="Student or Learning">
                      Student or Learning
                    </MenuItem>
                    <MenuItem value="Tester">Tester</MenuItem>
                    <MenuItem value="Intern">Intern</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                  <small>
                    Give us an idea of where you are at you'r career
                  </small>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                  <TextField
                    id="outlined-basic"
                    label="Company"
                    variant="outlined"
                    name="company"
                    onChange={(e) => onChange(e)}
                    value={company}
                  />
                  <small>Could be you'r own company or one you work for</small>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                  <TextField
                    id="outlined-basic"
                    label="Website"
                    variant="outlined"
                    name="website"
                    onChange={(e) => onChange(e)}
                    value={website}
                  />
                  <small>Could be you'r own website or a company website</small>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                  <TextField
                    id="outlined-basic"
                    label="Location"
                    variant="outlined"
                    name="location"
                    onChange={(e) => onChange(e)}
                    value={location}
                  />
                  <small>
                    Provence & City suggested (eg. Gauteng, Midrand)
                  </small>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                  <TextField
                    id="outlined-basic"
                    label="Skills Required*"
                    variant="outlined"
                    name="skills"
                    onChange={(e) => onChange(e)}
                    value={skills}
                  />
                  <small>
                    Please use comma separated values eg(HTML, CSS, Javascript,
                    PHP)
                  </small>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                  <TextField
                    id="outlined-multiline-static"
                    label="A short bio of yourself"
                    multiline
                    rows={4}
                    variant="outlined"
                    name="bio"
                    onChange={(e) => onChange(e)}
                    value={bio}
                  />
                  <small>Tell us a little about you!</small>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                  <ButtonGroup
                    size="large"
                    style={{ justifyContent: "flex-end" }}
                  >
                    <Button type="submit" color="primary">
                      Save
                    </Button>
                    <Button type="button" color="secondary" href="/dashboard">
                      Back
                    </Button>
                  </ButtonGroup>
                </FormControl>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
