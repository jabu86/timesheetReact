import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import { addTimecardThursday } from "../../../actions/timecards";
function ThursdayForm({ timecard_id, addTimecardThursday, status }) {
  const [formData, setFormData] = useState({
    hours: "",
    description: "",
  });
  const { hours, description } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    addTimecardThursday(timecard_id, formData);
    setFormData({
      hours: "",
      description: "",
    });
  };
  return (
    <Row>
      <Col md={3}></Col>
      <Col md={6}>
        <Fade>
          <Form
            className="mb-2"
            onSubmit={(e) => onSubmit(e)}
            className="text-left"
          >
            <Form.Group controlId="hours">
              <Form.Label>Time in hours to span on a task</Form.Label>
              <Form.Control
                as="select"
                name="hours"
                onChange={(e) => onChange(e)}
                value={hours}
              >
                <option value="" disabled>
                  Select Task Hours Span
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Short description on what you'r are going to do!"
                name="description"
                value={description}
                onChange={(e) => onChange(e)}
              />
            </Form.Group>
            {status ? (
              "timecard approved"
            ) : (
              <Button
                variant="success"
                size="small"
                type="submit"
                className="btn-block btn-sm mb-2"
              >
                Save
              </Button>
            )}
          </Form>
        </Fade>
      </Col>
    </Row>
  );
}

export default connect(null, { addTimecardThursday })(ThursdayForm);
