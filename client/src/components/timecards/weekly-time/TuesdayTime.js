import React, { Fragment } from "react";
import { Typography, Divider } from "@material-ui/core";
import { ListGroup } from "react-bootstrap";
import DeleteIcon from "@material-ui/icons/DeleteForeverRounded";
import { connect } from "react-redux";
import { deleteTuesdayTimecard } from "../../../actions/timecards";
function TuesdayTime({ tuesday, timecard_id, deleteTuesdayTimecard }) {
  const deleteTuesday = (id) => {
    deleteTuesdayTimecard(timecard_id, id);
  };
  return (
    <Fragment>
      <Divider />
      <ListGroup as="ul">
        <ListGroup.Item as="li">
          <Typography variant="h6">HOURS: {tuesday.hours}</Typography>
          <Typography variant="h6">TASK:</Typography>
          <Typography component="p">{tuesday.description}</Typography>

          <DeleteIcon
            color="secondary"
            onClick={(e) => deleteTuesday(tuesday._id)}
          />
        </ListGroup.Item>
      </ListGroup>
    </Fragment>
  );
}

export default connect(null, { deleteTuesdayTimecard })(TuesdayTime);
