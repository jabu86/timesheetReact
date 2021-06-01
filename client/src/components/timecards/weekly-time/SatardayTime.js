import React, { Fragment } from "react";
import { Typography, Divider } from "@material-ui/core";
import { ListGroup } from "react-bootstrap";
import DeleteIcon from "@material-ui/icons/DeleteForeverRounded";
import { connect } from "react-redux";
import { deleteSatardayTimecard } from "../../../actions/timecards";
function SatardayTime({ satarday, timecard_id, deleteSatardayTimecard }) {
  const deleteSatarday = (id) => {
    deleteSatardayTimecard(timecard_id, id);
  };
  return (
    <Fragment>
      <Divider />
      <ListGroup as="ul">
        <ListGroup.Item as="li">
          <Typography variant="h6">HOURS: {satarday.hours}</Typography>
          <Typography variant="h6">TASK:</Typography>
          <Typography component="p">{satarday.description}</Typography>

          <DeleteIcon
            color="secondary"
            onClick={(e) => deleteSatarday(satarday._id)}
          />
        </ListGroup.Item>
      </ListGroup>
    </Fragment>
  );
}

export default connect(null, { deleteSatardayTimecard })(SatardayTime);
