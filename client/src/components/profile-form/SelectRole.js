import React, { Fragment, useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { updateUserRole } from "../../actions/auth";
function SelectRole({ updateUserRole, user }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState({
    role: "",
  });
  useEffect(() => {
    setFormData({ role: !user.role ? "" : user.role });
  }, [user.role]);
  const { role } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const assignRole = (e) => {
    e.preventDefault();
    updateUserRole(formData, user._id);
    handleClose();
  };
  return (
    <Fragment>
      <Button variant="secondary" onClick={handleShow}>
        Assgin Role
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Assign Role</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(e) => assignRole(e)}>
          <Modal.Body>
            <Form.Group>
              <Form.Control
                as="select"
                size="lg"
                name="role"
                value={role}
                onChange={(e) => onChange(e)}
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="user">User</option>
              </Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit" className="float-right">
              ASSIGN ROLE
            </Button>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Fragment>
  );
}

export default connect(null, { updateUserRole })(SelectRole);
