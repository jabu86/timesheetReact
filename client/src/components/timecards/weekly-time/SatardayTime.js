import React, { Fragment } from "react";
import { Typography, Divider } from "@material-ui/core";
import { ListGroup, Row, Col } from "react-bootstrap";
import Flip from "react-reveal/Flip";
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
      <ListGroup variant="flush" className="text-left">
        <ListGroup.Item className="bg-light">
          <Flip cascade bottom>
            <Row>
              <Col md={1}>
                <Typography variant="h6">HOURS:</Typography>
              </Col>
              <Col md={10}>
                <Typography component="p" className="py-1">
                  {satarday.hours}
                </Typography>
              </Col>
            </Row>
            <Row>
              <Col md={1}>
                <Typography variant="h6">TASK:</Typography>
              </Col>
              <Col md={10}>
                <Typography component="p">{satarday.description}</Typography>
              </Col>
              <Col md={1}>
                <DeleteIcon
                  color="secondary"
                  onClick={(e) => deleteSatarday(satarday._id)}
                  className="float-right"
                />
              </Col>
            </Row>
          </Flip>
        </ListGroup.Item>
      </ListGroup>
    </Fragment>
  );
}

export default connect(null, { deleteSatardayTimecard })(SatardayTime);
