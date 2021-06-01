import React, { Fragment } from "react";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import WorkIcon from "@material-ui/icons/Work";
import CastForEducationIcon from "@material-ui/icons/CastForEducation";
import Book from "@material-ui/icons/Book";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function DashboardActions({ auth: { user, isAuthenticated } }) {
  const classes = useStyles();
  return (
    <Fragment>
      {isAuthenticated && user.role === "admin" || user.role === "manager" ? (
        <Link className="btn btn-dark m-2" to="/admin">
          <Book /> ADMIN
        </Link>
      ) : (
        ""
      )}
      <Link className="btn btn-dark m-2" to="/admin" to="/edit-profile">
        <AssignmentIndIcon /> EDIT-PROFILE
      </Link>
      <Link className="btn btn-dark m-2" to="/add-experience">
        <WorkIcon /> ADD EXPERIENCE
      </Link>
      <Link className="btn btn-dark m-2" to="/add-education">
        <CastForEducationIcon /> ADD EDUCATION
      </Link>
    </Fragment>
  );
}
const mapStateToProps = state=>({
    auth:state.auth
});
export default connect(mapStateToProps, null)(DashboardActions);
