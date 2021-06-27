import React, { Fragment } from "react";
import { Typography, Divider } from "@material-ui/core";
import { ListGroup } from "react-bootstrap";
import Flip from "react-reveal/Flip";
import DeleteIcon from "@material-ui/icons/DeleteForeverRounded";
import { connect } from "react-redux";
import { deleteMondayTimecard } from "../../../actions/timecards";
import { Row, Col } from "react-bootstrap";
function MondayTime({ timecard_id, monday, deleteMondayTimecard }) {
  return (
    <Fragment>
      <Divider />
      <ListGroup variant="flush" className="text-left">
        <ListGroup.Item className="bg-light">
          <Flip cascade bottom>
            <Row>
              <Col md={2}>
                <Typography variant="h6">HOURS:</Typography>
              </Col>
              <Col md={10}>
                <Typography component="p" className="py-1">
                  {monday.hours}
                </Typography>
              </Col>
            </Row>
            <Row>
              <Col md={2}>
                <Typography variant="h6">TASK:</Typography>
              </Col>
              <Col md={8}>
                <Typography component="p">{monday.description}</Typography>
              </Col>
              <Col md={1}>
                <DeleteIcon
                  color="secondary"
                  onClick={(e) => deleteMondayTimecard(timecard_id, monday._id)}
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

export default connect(null, { deleteMondayTimecard })(MondayTime);
