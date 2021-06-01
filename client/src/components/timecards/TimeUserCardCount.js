import React from "react";
import { Form } from "react-bootstrap";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { searchTimecard, orderTimecard } from "../../actions/timecards";

function TimeUserCardCount({
  searchTimecard,
  orderTimecard,
  timecard: { timecards },
}) {
  return (
    <>
      <Grid container justify="center" className="counter-grid">
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
                  onChange={(e) => searchTimecard(timecards, e.target.value)}
                />
              </Form.Row>
            </div>
            <div className="col-md-6">
              <Form>
                <Form.Group controlId="exampleForm.SelectCustom">
                  <Form.Control
                    as="select"
                    size="lg"
                    onChange={(e) => orderTimecard(timecards, e.target.value)}
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
      </Grid>
    </>
  );
}
const mapStateToProps = (state) => ({
  timecard: state.timecard,
  text: state.timecard.text,
  sort: state.timecard.sort,
});
export default connect(mapStateToProps, { searchTimecard, orderTimecard })(
  TimeUserCardCount
);
