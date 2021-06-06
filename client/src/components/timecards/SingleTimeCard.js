import {
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
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
import { Button } from "react-bootstrap";
import Spiner from "../Spiner";
import TotalHoursCount from "./TotalHoursCount";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },

  media: {
    height: 140,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    textAlign: "center",
  },
  large: {
    width: theme.spacing(23.6),
    height: theme.spacing(23.6),
  },
}));

function SingleTimeCard({
  match,
  auth: { isAuthenticated },
  getTimecard,
  timecard: { timecard, loading },
}) {
  const classes = useStyles();
  const [toggleMonday, setToggleMonday] = useState(false);
  const [toggleTuesday, setToggleTuesday] = useState(false);
  const [toggleWenedsday, setToggleWenedsday] = useState(false);
  const [toggleThursday, setToggleThursdsday] = useState(false);
  const [toggleFriday, setToggleFriday] = useState(false);
  const [toggleSatarday, setToggleSatarday] = useState(false);
  const [toggleSunday, setToggleSunday] = useState(false);

  useEffect(() => {
    getTimecard(match.params.id);
  }, [getTimecard, match.params.id]);

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
    <Fragment>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={1}>
          {loading ? (
            <Spiner />
          ) : (
            <Fragment>
              <Grid item xs={12}>
                <Card className={classes.root}>
                  <Grid container direction="row" justify="space-between">
                    <Grid item xs={12}>
                      <div className="row m-4">
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-md-6">
                              <Typography variant="h6">
                                Project Name:
                              </Typography>
                            </div>
                            <div className="col-md-6">
                              <Typography component="p">
                                {loading || !timecard.project
                                  ? ""
                                  : timecard.project}
                              </Typography>
                            </div>
                            <div className="col-md-6">
                              <Typography variant="h6">
                                Company Name:
                              </Typography>
                            </div>
                            <div className="col-md-6">
                              <Typography component="p">
                                {loading || !timecard.company
                                  ? ""
                                  : timecard.company}
                              </Typography>
                            </div>
                            <div className="col-md-6">
                              <Typography variant="h6">Week-From:</Typography>
                            </div>
                            <div className="col-md-6">
                              <Typography component="p">
                                {loading || !timecard.from
                                  ? ""
                                  : moment(timecard.from).format("YYYY/MM/DD")}
                              </Typography>
                            </div>
                            <div className="col-md-6">
                              <Typography variant="h6">Week-To:</Typography>
                            </div>
                            <div className="col-md-6">
                              <Typography component="p">
                                {loading || !timecard.to
                                  ? ""
                                  : moment(timecard.to).format("YYYY/MM/DD")}
                              </Typography>
                            </div>
                            <div className="col-md-6">
                              <Typography variant="h6">Total Hours:</Typography>
                            </div>
                            <div className="col-md-6">
                              <TotalHoursCount timecard={timecard} />
                            </div>
                          </div>
                          <u>
                            {" "}
                            <Typography variant="h5">
                              Activity Description:
                            </Typography>
                          </u>

                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {loading || !timecard.description
                              ? ""
                              : timecard.description}
                          </Typography>
                          <Typography className="float-right" component="p">
                            {loading || !timecard.createdAt
                              ? ""
                              : moment(timecard.createdAt).calendar()}
                          </Typography>
                        </div>
                        <div className="col-md-6 text-center">
                          {" "}
                          <img
                            className="img img-fluid img-thumbnail"
                            src={
                              loading || !timecard.user.image
                                ? ""
                                : timecard.user.image
                            }
                            alt={
                              loading || !timecard.user.name
                                ? ""
                                : timecard.user.name
                            }
                            style={{ width: "50%" }}
                          />
                          <h6>
                            {loading || !timecard.user.name
                              ? ""
                              : timecard.user.name}
                          </h6>
                          {isAuthenticated && timecard.status ? (
                            <Button
                              variant="primary"
                              className="float-right"
                              onClick={(e) => printPdf(timecard)}
                            >
                              Print
                            </Button>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                  {isAuthenticated ? (
                    <Grid item xs={12}>
                      <Paper className={classes.paper}>
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
                          onClick={() => setToggleWenedsday(!toggleWenedsday)}
                        >
                          Wendsday
                        </Button>
                        <Button
                          className="m-1"
                          onClick={() => setToggleThursdsday(!toggleThursday)}
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
                      </Paper>
                    </Grid>
                  ) : (
                    <Fragment>
                      <Grid item xs={12}>
                        <Paper className={classes.paper}>
                          Click<Link to="/login">here</Link>to view
                        </Paper>
                      </Grid>
                    </Fragment>
                  )}

                  {/* monday */}
                  {toggleMonday && (
                    <Fragment>
                      <CardContent>
                        {isAuthenticated ? (
                          <Fragment>
                            {" "}
                            <u>
                              <h3>
                                Monday Hours{" "}
                                {loading || !timecard.monday ? (
                                  ""
                                ) : (
                                  <small>
                                    <span className="badge badge-info">
                                      {timecard.monday.reduce(
                                        (a, v) => (a = a + v.hours),
                                        0
                                      )}
                                    </span>
                                  </small>
                                )}{" "}
                                & Task's {""}
                                {loading || !timecard.monday ? (
                                  ""
                                ) : (
                                  <small>
                                    <span className="badge badge-info">
                                      {timecard.monday.length}
                                    </span>
                                  </small>
                                )}
                              </h3>
                            </u>
                            <MondayForm
                              timecard_id={match.params.id}
                              status={timecard.status}
                            />
                            {/* Hours Monday span component */}
                            {loading || !timecard.monday
                              ? ""
                              : timecard.monday.map((monday) => (
                                  <MondayTime
                                    key={monday._id}
                                    monday={monday}
                                    timecard_id={match.params.id}
                                  />
                                ))}
                          </Fragment>
                        ) : (
                          ""
                        )}
                      </CardContent>
                    </Fragment>
                  )}
                  {/* Tuesday */}
                  {toggleTuesday && (
                    <CardContent>
                      {isAuthenticated ? (
                        <Fragment>
                          {" "}
                          <u>
                            <h3>
                              Tuesday Hours{" "}
                              {loading || !timecard.tuesday ? (
                                ""
                              ) : (
                                <small>
                                  {" "}
                                  <span className="badge badge-info">
                                    {timecard.tuesday.reduce(
                                      (a, v) => (a = a + v.hours),
                                      0
                                    )}
                                  </span>
                                </small>
                              )}{" "}
                              & Task's {""}
                              {loading || !timecard.tuesday ? (
                                ""
                              ) : (
                                <small>
                                  <span className="badge badge-info">
                                    {timecard.tuesday.length}
                                  </span>
                                </small>
                              )}
                            </h3>
                          </u>
                          <TuesdayForm
                            timecard_id={match.params.id}
                            status={timecard.status}
                          />
                          {/* Hours tuesday span component */}
                          {loading || !timecard.tuesday
                            ? ""
                            : timecard.tuesday.map((tuesday) => (
                                <TuesdayTime
                                  key={tuesday._id}
                                  tuesday={tuesday}
                                  timecard_id={match.params.id}
                                />
                              ))}
                        </Fragment>
                      ) : (
                        ""
                      )}
                    </CardContent>
                  )}
                  {/* Wendsday */}
                  {toggleWenedsday && (
                    <CardContent>
                      {isAuthenticated ? (
                        <Fragment>
                          {" "}
                          <u>
                            <h3>
                              Wendsday Hours{" "}
                              {loading || !timecard.wendsday ? (
                                ""
                              ) : (
                                <small>
                                  <span className="badge badge-info">
                                    {timecard.wendsday.reduce(
                                      (a, v) => (a = a + v.hours),
                                      0
                                    )}
                                  </span>
                                </small>
                              )}{" "}
                              & Task's {""}
                              {loading || !timecard.wendsday ? (
                                ""
                              ) : (
                                <small>
                                  <span className="badge badge-info">
                                    {timecard.wendsday.length}
                                  </span>
                                </small>
                              )}
                            </h3>
                          </u>
                          <WendsdayForm
                            timecard_id={match.params.id}
                            status={timecard.status}
                          />
                          {/* Hours wenedsday span component */}
                          {loading || !timecard.wendsday
                            ? ""
                            : timecard.wendsday.map((wendsday) => (
                                <WendsdayTime
                                  key={wendsday._id}
                                  wendsday={wendsday}
                                  timecard_id={match.params.id}
                                />
                              ))}
                        </Fragment>
                      ) : (
                        ""
                      )}
                    </CardContent>
                  )}
                  {/* Thursday */}
                  {toggleThursday && (
                    <CardContent>
                      {isAuthenticated ? (
                        <Fragment>
                          {" "}
                          <u>
                            <h3>
                              Thursday Hours{" "}
                              {loading || !timecard.thursday ? (
                                ""
                              ) : (
                                <small>
                                  <span className="badge badge-info">
                                    {timecard.thursday.reduce(
                                      (a, v) => (a = a + v.hours),
                                      0
                                    )}
                                  </span>
                                </small>
                              )}{" "}
                              & Task's {""}
                              {loading || !timecard.thursday ? (
                                ""
                              ) : (
                                <small>
                                  <span className="badge badge-info">
                                    {timecard.thursday.length}
                                  </span>
                                </small>
                              )}
                            </h3>
                          </u>
                          <ThursdayForm
                            timecard_id={match.params.id}
                            status={timecard.status}
                          />
                          {/* Hours thursday span component */}
                          {loading || !timecard.thursday
                            ? ""
                            : timecard.thursday.map((thursday) => (
                                <ThursdayTime
                                  key={thursday._id}
                                  thursday={thursday}
                                  timecard_id={match.params.id}
                                />
                              ))}
                        </Fragment>
                      ) : (
                        ""
                      )}
                    </CardContent>
                  )}
                  {/* Friday */}
                  {toggleFriday && (
                    <CardContent>
                      {isAuthenticated ? (
                        <Fragment>
                          <u>
                            {" "}
                            <h3>
                              Friday Hours{" "}
                              {loading || !timecard.friday ? (
                                ""
                              ) : (
                                <small>
                                  <span className="badge badge-info">
                                    {timecard.friday.reduce(
                                      (a, v) => (a = a + v.hours),
                                      0
                                    )}
                                  </span>
                                </small>
                              )}{" "}
                              & Task's {""}
                              {loading || !timecard.friday ? (
                                ""
                              ) : (
                                <small>
                                  <span className="badge badge-info">
                                    {timecard.friday.length}
                                  </span>
                                </small>
                              )}
                            </h3>
                          </u>
                          <FridayForm
                            timecard_id={match.params.id}
                            status={timecard.status}
                          />

                          {/* Hours thursday span component */}
                          {loading || !timecard.friday
                            ? ""
                            : timecard.friday.map((friday) => (
                                <FridayTime
                                  key={friday._id}
                                  friday={friday}
                                  timecard_id={match.params.id}
                                />
                              ))}
                        </Fragment>
                      ) : (
                        ""
                      )}
                    </CardContent>
                  )}
                  {/* Satarday */}
                  {toggleSatarday && (
                    <CardContent>
                      {isAuthenticated ? (
                        <Fragment>
                          {" "}
                          <u>
                            <h3>
                              Satarday Hours{" "}
                              {loading || !timecard.satarday ? (
                                ""
                              ) : (
                                <small>
                                  <span className="badge badge-info">
                                    {timecard.satarday.reduce(
                                      (a, v) => (a = a + v.hours),
                                      0
                                    )}
                                  </span>
                                </small>
                              )}{" "}
                              & Task's {""}
                              {loading || !timecard.satarday ? (
                                ""
                              ) : (
                                <small>
                                  <span className="badge badge-info">
                                    {timecard.satarday.length}
                                  </span>
                                </small>
                              )}
                            </h3>
                          </u>
                          <SatardayForm
                            timecard_id={match.params.id}
                            status={timecard.status}
                          />
                          {/* Hours satarday span component */}
                          {loading || !timecard.satarday
                            ? ""
                            : timecard.satarday.map((satarday) => (
                                <SatardayTime
                                  key={satarday._id}
                                  satarday={satarday}
                                  timecard_id={match.params.id}
                                />
                              ))}
                        </Fragment>
                      ) : (
                        ""
                      )}
                    </CardContent>
                  )}

                  {/* Sunday */}
                  {toggleSunday && (
                    <CardContent>
                      {isAuthenticated ? (
                        <Fragment>
                          <u>
                            <h3>
                              Sunday Hours{" "}
                              {loading || !timecard.sunday ? (
                                ""
                              ) : (
                                <small>
                                  <span className="badge badge-info">
                                    {timecard.sunday.reduce(
                                      (a, v) => (a = a + v.hours),
                                      0
                                    )}
                                  </span>
                                </small>
                              )}{" "}
                              & Task's {""}
                              {loading || !timecard.sunday ? (
                                ""
                              ) : (
                                <small>
                                  <span className="badge badge-info">
                                    {timecard.sunday.length}
                                  </span>
                                </small>
                              )}
                            </h3>
                          </u>
                          <SundayForm
                            timecard_id={match.params.id}
                            status={timecard.status}
                          />

                          {/* Hours satarday span component */}
                          {loading || !timecard.sunday
                            ? ""
                            : timecard.sunday.map((sunday) => (
                                <SundayTime
                                  key={sunday._id}
                                  sunday={sunday}
                                  timecard_id={match.params.id}
                                />
                              ))}
                        </Fragment>
                      ) : (
                        ""
                      )}
                    </CardContent>
                  )}

                  <CardActions style={{ float: "right" }}>
                    <Button
                      href="/timecard"
                      size="small"
                      color="secondary"
                      variant="danger"
                    >
                      Back
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Fragment>
          )}
        </Grid>
      </Container>
    </Fragment>
  );
}
const mapStateToProps = (state) => ({
  timecard: state.timecard,
  auth: state.auth,
});
export default connect(mapStateToProps, { getTimecard })(SingleTimeCard);
