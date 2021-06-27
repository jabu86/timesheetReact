import React from "react";
import { Form } from "react-bootstrap";
import { Grid } from "@material-ui/core";
import {Fade} from 'react-reveal';
import { useDispatch } from "react-redux";
import { searchTimecard, orderTimecard } from "../../actions/timecards";

function TimeUserCardCount() {
const dispatch = useDispatch();
  return (
    <>
      <Fade left cascade>
        <Grid item sm={12}>
          {" "}
          <div className="row">
            <div className="col-md-6">
              <Form.Row>
                <Form.Control
                  size="lg"
                  type="text"
                  placeholder="Search...."
                  name="search"
                  onChange={(e) => dispatch(searchTimecard(e.target.value))}
                />
              </Form.Row>
            </div>
            <div className="col-md-6">
              <Form>
                <Form.Group controlId="exampleForm.SelectCustom">
                  <Form.Control
                    as="select"
                    size="lg"
                    onChange={(e) => dispatch(orderTimecard(e.target.value))}
                    custom
                  >
                    <option value="latest">Latest</option>
                    <option value="older">Older</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </div>
          </div>
        </Grid>
      </Fade>
    </>
  );
}

export default  TimeUserCardCount;
