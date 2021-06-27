import React, { Fragment } from "react";
import { Typography, Divider } from "@material-ui/core";
import { ListGroup, Row, Col } from "react-bootstrap";
import Flip from "react-reveal/Flip";
import DeleteIcon from "@material-ui/icons/DeleteForeverRounded";
import { connect } from "react-redux";
import { deleteFridayTimecard } from "../../../actions/timecards";
function FridayTime({ friday, timecard_id, deleteFridayTimecard }) {
  const deleteFriday = (id) => {
    deleteFridayTimecard(timecard_id, id);
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
                  {friday.hours}
                </Typography>
              </Col>
            </Row>
            <Row>
              <Col md={1}>
                <Typography variant="h6">TASK:</Typography>
              </Col>
              <Col md={10}>
                <Typography component="p">{friday.description}</Typography>
              </Col>
              <Col md={1}>
                <DeleteIcon
                  color="secondary"
                  onClick={(e) => deleteFriday(friday._id)}
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

export default connect(null, { deleteFridayTimecard })(FridayTime);
