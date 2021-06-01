import React, { Fragment } from "react";
import { Typography, Divider } from "@material-ui/core";
import { ListGroup } from "react-bootstrap";
import DeleteIcon from "@material-ui/icons/DeleteForeverRounded";
import { connect } from "react-redux";
import { deleteThursdayTimecard } from "../../../actions/timecards";
function ThursdayTime({ thursday, timecard_id, deleteThursdayTimecard }) {
  const deleteThursday = (id) => {
    deleteThursdayTimecard(timecard_id, id);
  };
  return (
    <Fragment>
      <Divider />
      <ListGroup as="ul">
        <ListGroup.Item as="li">
          <Typography variant="h6">HOURS: {thursday.hours}</Typography>
          <Typography variant="h6">TASK:</Typography>
          <Typography component="p">{thursday.description}</Typography>

          <DeleteIcon
            color="secondary"
            onClick={(e) => deleteThursday(thursday._id)}
          />
        </ListGroup.Item>
      </ListGroup>
    </Fragment>
  );
}

export default connect(null, { deleteThursdayTimecard })(ThursdayTime);
