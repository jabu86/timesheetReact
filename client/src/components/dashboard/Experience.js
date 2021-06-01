import React, { Fragment } from "react";
import { Button, Typography, Divider } from "@material-ui/core";
import moment from "moment";
import { connect } from "react-redux";
import { deleteExpreience } from "../../actions/profile";
import DeleteIcon from "@material-ui/icons/DeleteForeverRounded";
function Experience({ experience, deleteExpreience }) {

  let experiences;
  if (experience) {
    experiences = experience.map((exp) => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <p>
            <strong>
              <em>From</em>
            </strong>
            {": "}
            {moment(exp.from).format("YYYY/MM/DD")}
          </p>
          <p>
            <strong>
              <em>To</em>
            </strong>
            {": "}
            {exp.to === null ? "Now" : moment(exp.to).format("YYYY/MM/DD")}
          </p>
        </td>
        <td>
          <Button
            variant="contained"
            color="secondary"
            onClick={(e) => deleteExpreience(exp._id)}
          >
            <DeleteIcon />
          </Button>
        </td>
      </tr>
    ));
  }

  return (
    <Fragment>
      <Typography variant="h5">Exprience Cradentials</Typography>
      <Divider />
      <div style={{overflowX:'auto'}}>
        <table width="50">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>{experiences}</tbody>
        </table>
      </div>
    </Fragment>
  );
}

export default connect(null, { deleteExpreience })(Experience);
