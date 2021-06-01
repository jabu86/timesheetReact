import React, { Fragment } from "react";
import { Typography, Divider } from "@material-ui/core";
import { ListGroup } from "react-bootstrap";
import DeleteIcon from "@material-ui/icons/DeleteForeverRounded";
import { connect } from "react-redux";
import {deleteFridayTimecard} from "../../../actions/timecards";
function FridayTime({ friday, timecard_id, deleteFridayTimecard }) {
  const deleteFriday = (id) => {
    deleteFridayTimecard(timecard_id, id);
  };
  return (
    <Fragment>
      <Divider />
      <ListGroup as="ul">
        <ListGroup.Item as="li">
          <Typography variant="h6">HOURS: {friday.hours}</Typography>
          <Typography variant="h6">TASK:</Typography>
          <Typography component="p">{friday.description}</Typography>

          <DeleteIcon
            color="secondary"
            onClick={(e) => deleteFriday(friday._id)}
          />
        </ListGroup.Item>
      </ListGroup>
    </Fragment>
  );
}

export default connect(null, { deleteFridayTimecard })(FridayTime);
