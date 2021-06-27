import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  IconButton,
  Paper,
  Typography,
  TextField,
} from "@material-ui/core";
import Bounce from 'react-reveal/Flip';
import AddBoxIcon from "@material-ui/icons/AddBox";
import Modal from "react-modal";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { connect } from "react-redux";
import { addTimecard } from "../../actions/timecards";
import { animations } from "react-animation";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  animation: animations.popIn,
}));

const customStyles = {
  content: {
    width: "70%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
function AddTimeCard({ addTimecard }) {
  const classes = useStyles();
  const [modalIsOpen, setlIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    project: "",
    from: "",
    to: "",
    description: "",
  });

  const { project, company, from, to, description } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  function openModal() {
    setlIsOpen(true);
  }

  function closeModal() {
    setlIsOpen(false);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    addTimecard(formData);
    setFormData({
      company: "",
      project: "",
      from: "",
      to: "",
      description: "",
    });
    setlIsOpen(false);
  };
  return (
    <Fragment>
      <Bounce cascade top>
        <Paper className="dashboard-header">
          <Typography>Create you'r weekly timesheet click </Typography>

          <Button
            variant="contained"
            size="large"
            color="primary"
            startIcon={<AddBoxIcon />}
            onClick={openModal}
          >
            Create TimeCarde
          </Button>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            ariaHideApp={false}
            contentLabel="Selected Option"
          >
            <IconButton icon onClick={closeModal} style={{ float: "right" }}>
              <HighlightOffIcon color="secondary" />
            </IconButton>
            <div>
              <Typography variant="h5">Planned Activities</Typography>
            </div>
            <form onSubmit={onSubmit}>
              <FormControl
                fullWidth
                className={classes.margin}
                variant="outlined"
              >
                <InputLabel htmlFor="project-name">Project Name</InputLabel>
                <OutlinedInput
                  id="project-name"
                  onChange={(e) => onChange(e)}
                  labelWidth={100}
                  name="project"
                  value={project}
                />
              </FormControl>
              <FormControl
                fullWidth
                className={classes.margin}
                variant="outlined"
              >
                <InputLabel htmlFor="project-name">Company Name</InputLabel>
                <OutlinedInput
                  id="project-name"
                  name="company"
                  onChange={(e) => onChange(e)}
                  labelWidth={120}
                  value={company}
                />
              </FormControl>
              <FormControl
                fullWidth
                className={classes.margin}
                variant="outlined"
              >
                <TextField
                  id="date"
                  label="Week Start"
                  type="date"
                  name="from"
                  value={from}
                  onChange={(e) => onChange(e)}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  id="date"
                  label="Week Ending"
                  type="date"
                  name="to"
                  value={to}
                  onChange={(e) => onChange(e)}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
              <FormControl
                fullWidth
                className={classes.margin}
                variant="outlined"
              >
                <InputLabel htmlFor="activity-description">
                  Activity Description
                </InputLabel>
                <OutlinedInput
                  id="activity-description"
                  multiline
                  rows={4}
                  variant="outlined"
                  labelWidth={140}
                  name="description"
                  value={description}
                  onChange={(e) => onChange(e)}
                />
              </FormControl>
              <Button type="submit" color="primary" variant="contained">
                Save
              </Button>
            </form>
          </Modal>
        </Paper>
      </Bounce>
    </Fragment>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  timecard: state.timecard,
});
export default connect(mapStateToProps, { addTimecard })(AddTimeCard);
