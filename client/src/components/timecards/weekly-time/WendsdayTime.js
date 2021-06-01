import React, { Fragment } from "react";
import { Typography, Divider } from "@material-ui/core";
import { ListGroup } from "react-bootstrap";
import DeleteIcon from "@material-ui/icons/DeleteForeverRounded";
import { connect } from "react-redux";
import { deleteWendsdayTimecard } from "../../../actions/timecards";
function WendsdayTime({ wendsday, timecard_id, deleteWendsdayTimecard }) {
  const deleteWendsday = (id) => {
    deleteWendsdayTimecard(timecard_id, id);
  };
  return (
    <Fragment>
      <Divider />
      <ListGroup as="ul">
        <ListGroup.Item as="li">
          <Typography variant="h6">HOURS: {wendsday.hours}</Typography>
          <Typography variant="h6">TASK:</Typography>
          <Typography component="p">{wendsday.description}</Typography>

          <DeleteIcon
            color="secondary"
            onClick={(e) => deleteWendsday(wendsday._id)}
          />
        </ListGroup.Item>
      </ListGroup>
    </Fragment>
  );
}

export default connect(null, { deleteWendsdayTimecard })(WendsdayTime);
