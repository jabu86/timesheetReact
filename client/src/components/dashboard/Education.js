import React, { Fragment } from "react";
import { Button, Typography, Divider } from "@material-ui/core";
import moment from "moment";
import {deleteEducation} from '../../actions/profile';
import DeleteIcon from "@material-ui/icons/DeleteForeverRounded";
import {connect} from 'react-redux';
function Education({ education, deleteEducation }) {
  let educations;
  if (education) {
    educations = education.map((edu) => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          <p>
            <strong>
              <em>From</em>
            </strong>
            {": "}
            {moment(edu.from).format("YYYY/MM/DD")}
          </p>
          <p>
            <strong>
              <em>To</em>
            </strong>{": "}
            {edu.to === null ? "Now" : moment(edu.to).format("YYYY/MM/DD")}
          </p>
        </td>
        <td>
          <Button
            variant="contained"
            color="secondary"
            onClick={(e) => deleteEducation(edu._id)}
          >
            <DeleteIcon />
          </Button>
        </td>
      </tr>
    ));
  }

  return (
    <Fragment>
      <Typography variant="h5">Education Cradentials</Typography>
      <Divider />
      <div style={{ overflowX: "auto" }}>
        <table width="50">
          <thead>
            <tr>
              <th>School/Degree/Certificate</th>
              <th>Qualification</th>
              <th>Years</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>{educations}</tbody>
        </table>
      </div>
    </Fragment>
  );
}

export default connect(null, {deleteEducation})(Education);
