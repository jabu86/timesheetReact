import React, { Fragment } from "react";
import { Typography, Divider } from "@material-ui/core";
import { ListGroup } from "react-bootstrap";
import DeleteIcon from "@material-ui/icons/DeleteForeverRounded";
import { connect } from "react-redux";
import { deleteSundayTimecard } from "../../../actions/timecards";
function SundayTime({ sunday, timecard_id, deleteSundayTimecard }) {
  const deleteSunday = (id) => {
    deleteSundayTimecard(timecard_id, id);
  };
  return (
    <Fragment>
      <Divider />
      <ListGroup as="ul">
        <ListGroup.Item as="li">
          <Typography variant="h6">HOURS: {sunday.hours}</Typography>
          <Typography variant="h6">TASK:</Typography>
          <Typography component="p">{sunday.description}</Typography>
          <DeleteIcon
            color="secondary"
            onClick={(e) => deleteSunday(sunday._id)}
          />
        </ListGroup.Item>
      </ListGroup>
    </Fragment>
  );
}

export default connect(null, { deleteSundayTimecard })(SundayTime);
