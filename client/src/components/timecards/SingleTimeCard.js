import {
  Card,
  Typography,
  Avatar,
} from "@material-ui/core";
import { Button, Row, Col, ListGroup } from "react-bootstrap";

import Fade from 'react-reveal/Fade';
import React, { Fragment, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { getTimecard } from "../../actions/timecards";
import moment from "moment";
import MondayTime from "./weekly-time/MondayTime";
import TuesdayTime from "./weekly-time/TuesdayTime";
import WendsdayTime from "./weekly-time/WendsdayTime";
import ThursdayTime from "./weekly-time/ThursdayTime";
import FridayTime from "./weekly-time/FridayTime";
import SatardayTime from "./weekly-time/SatardayTime";
import SundayTime from "./weekly-time/SundayTime";
import MondayForm from "./weekly-form/MondayForm";
import TuesdayForm from "./weekly-form/TuesdayForm";
import WendsdayForm from "./weekly-form/WendsdayForm";
import ThursdayForm from "./weekly-form/ThursdayForm";
import FridayForm from "./weekly-form/FridayForm";
import SatardayForm from "./weekly-form/SatardayForm";
import SundayForm from "./weekly-form/SundayForm";
import Spiner from "../Spiner";
import TotalHoursCount from "./TotalHoursCount";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";


function SingleTimeCard({ match, auth: { isAuthenticated, user } }) {
  const dispatch = useDispatch();
  const timecardList = useSelector((state) => state.timecardDetails);
  const { loading, error, timecard } = timecardList;
  useEffect(() => {
    dispatch(getTimecard(match.params.id));
  }, [dispatch, match.params.id]);


  const [toggleMonday, setToggleMonday] = useState(false);
  const [toggleTuesday, setToggleTuesday] = useState(false);
  const [toggleWenedsday, setToggleWenedsday] = useState(false);
  const [toggleThursday, setToggleThursdsday] = useState(false);
  const [toggleFriday, setToggleFriday] = useState(false);
  const [toggleSatarday, setToggleSatarday] = useState(false);
  const [toggleSunday, setToggleSunday] = useState(false);

  const doc = new jsPDF();
  //Print Pdf
  const printPdf = (timecard) => {
    doc.text("Weekly Timecard", 10, 10);
    doc.text("Name: " + timecard.name, 10, 20);
    doc.text("Company: " + timecard.company, 10, 30);
    doc.text("Project: " + timecard.project, 10, 40);
    doc.text(
      "Week-Start: " + moment(timecard.from).format("YYYY/MM/DD"),
      10,
      50
    );
    doc.text(
      "Week-Ending: " + moment(timecard.to).format("YYYY/MM/DD"),
      10,
      60
    );
    doc.text("Weekly-Hours", 10, 70);
    doc.text(
      "Monday: " + timecard.monday.reduce((a, v) => (a = a + v.hours), 0),
      10,
      80
    );
    doc.text(
      "Tuesday: " + timecard.tuesday.reduce((a, v) => (a = a + v.hours), 0),
      10,
      90
    );
    doc.text(
      "Wendsday: " + timecard.wendsday.reduce((a, v) => (a = a + v.hours), 0),
      10,
      100
    );
    doc.text(
      "Thursday: " + timecard.thursday.reduce((a, v) => (a = a + v.hours), 0),
      10,
      110
    );
    doc.text(
      "Friday: " + timecard.friday.reduce((a, v) => (a = a + v.hours), 0),
      10,
      120
    );
    doc.text(
      "Satarday: " + timecard.satarday.reduce((a, v) => (a = a + v.hours), 0),
      10,
      130
    );
    doc.text(
      "Sunday: " + timecard.sunday.reduce((a, v) => (a = a + v.hours), 0),
      10,
      140
    );
    doc.text("TOTAL: " + timecard.total_hours, 10, 150);
    doc.save("a4.pdf");
  };
  return (
    <div>
      {loading ? (
        <Spiner />
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <Fragment>
          <Fade bottom cascade>
            <Link className="btn btn-light my-3" to="/">
              Go Back
            </Link>
            <Row>
              <Col md={12}>
                <Card>
                  <Fade bottom cascade>
                    {" "}
                    <ListGroup variant="flush" className="py-2 m-2">
                      <Row>
                        <Col md={6}>
                          <Avatar
                            src={timecard.user.image}
                            alt={timecard.user.name}
                            className="ml-3"
                          />
                        </Col>
                        <Col md={6}>{timecard.name}</Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <Typography variant="h6" className="ml-2">
                            Company Name:
                          </Typography>
                        </Col>
                        <Col md={6}>
                          <p>{timecard.company}</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <Typography variant="h6" className="ml-2">
                            Project Name:
                          </Typography>
                        </Col>
                        <Col md={6}>
                          <p>{timecard.project}</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <Row>
                            <Col>
                              {" "}
                              <Typography variant="h6" className="ml-2">
                                Week-From:
                              </Typography>
                            </Col>
                            <Col>
                              {moment(timecard.from).format("YYYY/MM/DD")}
                            </Col>
                          </Row>
                        </Col>
                        <Col md={6}>
                          <Row>
                            <Col>
                              {" "}
                              <Typography variant="h6">Week-Ending:</Typography>
                            </Col>
                            <Col>
                              <p>{moment(timecard.to).format("YYYY/MM/DD")}</p>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <Typography variant="h6" className="ml-2">
                            Hours:
                          </Typography>
                        </Col>
                        <Col md={6}>
                          <p>
                            {timecard.status === false ? (
                              <TotalHoursCount timecard={timecard} />
                            ) : (
                              timecard.total_hours
                            )}
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <u>
                            <Typography variant="h6" className="ml-2">
                              Description
                            </Typography>
                          </u>
                        </Col>
                        <Col md={12} className="ml-2">
                          <p>{timecard.description}</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}></Col>
                        <Col md={6}>
                          {" "}
                          {isAuthenticated && timecard.status ? (
                            <Button
                              variant="primary"
                              className="btn-sm"
                              onClick={(e) => printPdf(timecard)}
                            >
                              Print
                            </Button>
                          ) : (
                            ""
                          )}
                          <Typography className="float-right m-2">
                            {moment(timecard.createdAt).calendar()}
                          </Typography>
                        </Col>
                      </Row>
                    </ListGroup>
                  </Fade>
                </Card>
              </Col>
              {isAuthenticated && user._id === timecard.user._id &&(
                <Col md={12}>
                  <Card>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row className="bg-light m-2 py-2">
                          <Col md={12} className="text-center">
                            {" "}
                            <Button
                              className="m-1"
                              onClick={() => setToggleMonday(!toggleMonday)}
                            >
                              Monday
                            </Button>
                            <Button
                              className="m-1"
                              onClick={() => setToggleTuesday(!toggleTuesday)}
                            >
                              Tuesday
                            </Button>
                            <Button
                              className="m-1"
                              onClick={() =>
                                setToggleWenedsday(!toggleWenedsday)
                              }
                            >
                              Wendsday
                            </Button>
                            <Button
                              className="m-1"
                              onClick={() =>
                                setToggleThursdsday(!toggleThursday)
                              }
                            >
                              Thursday
                            </Button>
                            <Button
                              className="m-1"
                              onClick={() => setToggleFriday(!toggleFriday)}
                            >
                              Friday
                            </Button>
                            <Button
                              className="m-1"
                              onClick={() => setToggleSatarday(!toggleSatarday)}
                            >
                              Satarday
                            </Button>
                            <Button
                              className="m-1"
                              onClick={() => setToggleSunday(!toggleSunday)}
                            >
                              Sunday
                            </Button>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          {toggleMonday && (
                            <Col className="text-center" md={12}>
                              <u>
                                <h3>
                                  Monday Hours{" "}
                                  <small>
                                    <span className="badge badge-info">
                                      {timecard.monday.reduce(
                                        (a, v) => (a = a + v.hours),
                                        0
                                      )}
                                    </span>
                                  </small>
                                  & Task's{" "}
                                  {timecard.monday ? (
                                    <small>
                                      <span className="badge badge-info">
                                        {timecard.monday.length}
                                      </span>
                                    </small>
                                  ) : (
                                    ""
                                  )}
                                </h3>
                              </u>
                              <MondayForm
                                timecard_id={match.params.id}
                                status={timecard.status}
                              />
                              {timecard.monday
                                ? timecard.monday.map((monday) => (
                                    <MondayTime
                                      key={monday._id}
                                      monday={monday}
                                      timecard_id={match.params.id}
                                    />
                                  ))
                                : ""}
                            </Col>
                          )}
                        </Row>

                        <Row>
                          {toggleTuesday && (
                            <Col className="text-center" md={12}>
                              <u>
                                <h3>
                                  Tuesday Hours{" "}
                                  <small>
                                    <span className="badge badge-info">
                                      {timecard.tuesday.reduce(
                                        (a, v) => (a = a + v.hours),
                                        0
                                      )}
                                    </span>
                                  </small>
                                  & Task's{" "}
                                  {timecard.tuesday ? (
                                    <small>
                                      <span className="badge badge-info">
                                        {timecard.tuesday.length}
                                      </span>
                                    </small>
                                  ) : (
                                    ""
                                  )}
                                </h3>
                              </u>
                              <TuesdayForm
                                timecard_id={match.params.id}
                                status={timecard.status}
                              />
                              {timecard.tuesday
                                ? timecard.tuesday.map((tuesday) => (
                                    <TuesdayTime
                                      key={tuesday._id}
                                      tuesday={tuesday}
                                      timecard_id={match.params.id}
                                    />
                                  ))
                                : ""}
                            </Col>
                          )}
                        </Row>

                        <Row>
                          {toggleWenedsday && (
                            <Col className="text-center" md={12}>
                              <u>
                                <h3>
                                  Wendsday Hours{" "}
                                  <small>
                                    <span className="badge badge-info">
                                      {timecard.wendsday.reduce(
                                        (a, v) => (a = a + v.hours),
                                        0
                                      )}
                                    </span>{" "}
                                  </small>
                                  & Task's{" "}
                                  {timecard.wendsday ? (
                                    <small>
                                      <span className="badge badge-info">
                                        {timecard.wendsday.length}
                                      </span>
                                    </small>
                                  ) : (
                                    ""
                                  )}
                                </h3>
                              </u>
                              <WendsdayForm
                                timecard_id={match.params.id}
                                status={timecard.status}
                              />
                              {timecard.wendsday
                                ? timecard.wendsday.map((wendsday) => (
                                    <WendsdayTime
                                      key={wendsday._id}
                                      wendsday={wendsday}
                                      timecard_id={match.params.id}
                                    />
                                  ))
                                : ""}
                            </Col>
                          )}
                        </Row>

                        <Row>
                          {toggleThursday && (
                            <Col className="text-center" md={12}>
                              <u>
                                <h3>
                                  Thursday Hours{" "}
                                  <small>
                                    <span className="badge badge-info">
                                      {timecard.thursday.reduce(
                                        (a, v) => (a = a + v.hours),
                                        0
                                      )}
                                    </span>{" "}
                                  </small>
                                  & Task's{" "}
                                  {timecard.thursday ? (
                                    <small>
                                      <span className="badge badge-info">
                                        {timecard.thursday.length}
                                      </span>
                                    </small>
                                  ) : (
                                    ""
                                  )}
                                </h3>
                              </u>
                              <ThursdayForm
                                timecard_id={match.params.id}
                                status={timecard.status}
                              />
                              {timecard.thursday
                                ? timecard.thursday.map((thursday) => (
                                    <ThursdayTime
                                      key={thursday._id}
                                      thursday={thursday}
                                      timecard_id={match.params.id}
                                    />
                                  ))
                                : ""}
                            </Col>
                          )}
                        </Row>

                        <Row>
                          {toggleFriday && (
                            <Col className="text-center" md={12}>
                              <u>
                                <h3>
                                  Friday Hours{" "}
                                  <small>
                                    <span className="badge badge-info">
                                      {timecard.friday.reduce(
                                        (a, v) => (a = a + v.hours),
                                        0
                                      )}
                                    </span>{" "}
                                  </small>
                                  & Task's{" "}
                                  {timecard.friday ? (
                                    <small>
                                      <span className="badge badge-info">
                                        {timecard.friday.length}
                                      </span>
                                    </small>
                                  ) : (
                                    ""
                                  )}
                                </h3>
                              </u>
                              <FridayForm
                                timecard_id={match.params.id}
                                status={timecard.status}
                              />
                              {timecard.friday
                                ? timecard.friday.map((friday) => (
                                    <FridayTime
                                      key={friday._id}
                                      friday={friday}
                                      timecard_id={match.params.id}
                                    />
                                  ))
                                : ""}
                            </Col>
                          )}
                        </Row>

                        <Row>
                          {toggleSatarday && (
                            <Col className="text-center" md={12}>
                              <u>
                                <h3>
                                  Satarday Hours{" "}
                                  <small>
                                    <span className="badge badge-info">
                                      {timecard.satarday.reduce(
                                        (a, v) => (a = a + v.hours),
                                        0
                                      )}
                                    </span>{" "}
                                  </small>
                                  & Task's{" "}
                                  {timecard.satarday ? (
                                    <small>
                                      <span className="badge badge-info">
                                        {timecard.satarday.length}
                                      </span>
                                    </small>
                                  ) : (
                                    ""
                                  )}
                                </h3>
                              </u>
                              <SatardayForm
                                timecard_id={match.params.id}
                                status={timecard.status}
                              />
                              {timecard.satarday
                                ? timecard.satarday.map((satarday) => (
                                    <SatardayTime
                                      key={satarday._id}
                                      satarday={satarday}
                                      timecard_id={match.params.id}
                                    />
                                  ))
                                : ""}
                            </Col>
                          )}
                        </Row>

                        <Row>
                          {toggleSunday && (
                            <Col className="text-center" md={12}>
                              <u>
                                <h3>
                                  Sunday Hours{" "}
                                  <small>
                                    <span className="badge badge-info">
                                      {timecard.sunday.reduce(
                                        (a, v) => (a = a + v.hours),
                                        0
                                      )}
                                    </span>{" "}
                                  </small>
                                  & Task's{" "}
                                  {timecard.sunday ? (
                                    <small>
                                      <span className="badge badge-info">
                                        {timecard.sunday.length}
                                      </span>
                                    </small>
                                  ) : (
                                    ""
                                  )}
                                </h3>
                              </u>
                              <SundayForm
                                timecard_id={match.params.id}
                                status={timecard.status}
                              />
                              {timecard.sunday
                                ? timecard.sunday.map((sunday) => (
                                    <SundayTime
                                      key={sunday._id}
                                      sunday={sunday}
                                      timecard_id={match.params.id}
                                    />
                                  ))
                                : ""}
                            </Col>
                          )}
                        </Row>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
              )}
            </Row>
          </Fade>
        </Fragment>
      )}
    </div>
  );
}
const mapStateToProps = (state) => ({
  timecard: state.timecard,
  auth: state.auth,
});
export default connect(mapStateToProps, { getTimecard })(SingleTimeCard);
