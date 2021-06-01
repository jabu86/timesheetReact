import React, { Fragment } from "react";
import { Typography, Divider } from "@material-ui/core";
import { ListGroup } from "react-bootstrap";
import DeleteIcon from "@material-ui/icons/DeleteForeverRounded";
import { connect } from "react-redux";
import { deleteMondayTimecard } from "../../../actions/timecards";
function MondayTime({ timecard_id, monday, deleteMondayTimecard }) {
  const deleteMonday = (timecard_id, id) => {
    deleteMondayTimecard(timecard_id, id);
  };

  return (
    <Fragment>
      <Divider />
      <ListGroup as="ul">
        <ListGroup.Item as="li">
          <Typography variant="h6">HOURS: {monday.hours}</Typography>
          <Typography variant="h6">TASK:</Typography>
          <Typography component="p">{monday.description}</Typography>

          <DeleteIcon
            onClick={(e) => deleteMonday(timecard_id, monday._id)}
            color="secondary"
          />
        </ListGroup.Item>
      </ListGroup>
    </Fragment>
  );
}

export default connect(null, { deleteMondayTimecard })(MondayTime);
