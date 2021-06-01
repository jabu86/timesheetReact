import {
  Button,
  Typography,
  Select,
  TextField,
  InputLabel,
  FormControl,
  MenuItem,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { addTimecardMonday, getMondayTimecard } from "../../actions/timecards";
const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  root: {
    //maxWidth: 345,
  },
  media: {
    height: 140,
  },
  paper: {
    padding: theme.spacing(2),
    //  textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
function HoursTimeCard({
  addTimecardMonday,
  timecard: {
    monday,
    tuesday,
    wendsday,
    thursday,
    friday,
    satarday,
    sunday,
    _id,
  },
}) {

  const classes = useStyles();
  const [formData, setFormData] = useState({
    hours: "",
    description: "",
  });

  const { hours, description } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmitMondayHandler = (e) => {
    e.preventDefault();
    addTimecardMonday(_id, formData);
  };
  return (
    <Fragment>
     </Fragment>
  );
}
const mapStateToProps = (state) => ({
  timecards: state.timecard,
});
export default connect(mapStateToProps, {
  addTimecardMonday,
  getMondayTimecard,
})(HoursTimeCard);
