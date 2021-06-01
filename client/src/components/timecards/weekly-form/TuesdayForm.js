import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { addTimecardTuesday } from "../../../actions/timecards";
function TuesdayForm({ timecard_id, addTimecardTuesday }) {
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
    addTimecardTuesday(timecard_id, formData);
    setFormData({
      hours: "",
      description: "",
    });
  };
  return (
    <Form className="mb-2" onSubmit={(e) => onSubmit(e)}>
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
      <Button variant="primary" size="lg" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default connect(null, { addTimecardTuesday })(TuesdayForm);
