import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
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
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

function AddExperience({ addExperience, history }) {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });
  const [toDateDisabled, toggleDisabled] = useState(false);
  const { company, title, location, from, to, current, description } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <Fragment>
      <Container className={classes.cardGrid}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h4">EXPERIENCE BACKGROUND</Typography>
              <Typography>
                Add any positions that you have had in the past
              </Typography>
              <small>* = required field</small>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <form
                className={classes.form}
                onSubmit={(e) => {
                  e.preventDefault();
                    addExperience(formData, history);
                }}
              >
                <FormControl variant="outlined" className={classes.formControl}>
                  <TextField
                    id="outlined-basic"
                    label="* Job Title"
                    variant="outlined"
                    name="title"
                    onChange={(e) => onChange(e)}
                    value={title}
                    required
                  />
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                  <TextField
                    id="outlined-basic"
                    label="* Company"
                    variant="outlined"
                    name="company"
                    onChange={(e) => onChange(e)}
                    value={company}
                  />
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
                </FormControl>

                <FormControl variant="outlined" className={classes.formControl}>
                  <TextField
                    id="date"
                    label="From Date"
                    type="date"
                    defaultValue=""
                    name="from"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => onChange(e)}
                    value={from}
                  />
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                  <Checkbox
                    checked={current}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        current: !current,
                      });
                      toggleDisabled(!toDateDisabled);
                    }}
                    inputProps={{ "aria-label": "primary checkbox" }}
                    name="current"
                    value={current}
                    className={classes.textField}
                  />
                </FormControl>

                <FormControl variant="outlined" className={classes.formControl}>
                  <TextField
                    id="date"
                    label="To Date"
                    type="date"
                    defaultValue=""
                    name="to"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => onChange(e)}
                    value={to}
                    disabled={toDateDisabled ? "disabled" : ""}
                  />
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                  <TextField
                    id="outlined-multiline-static"
                    label="Info about the position held"
                    multiline
                    rows={4}
                    variant="outlined"
                    name="description"
                    onChange={(e) => onChange(e)}
                    value={description}
                  />
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

export default connect(null, { addExperience })(withRouter(AddExperience));
