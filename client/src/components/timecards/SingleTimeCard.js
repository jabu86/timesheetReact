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
  },
  large: {
    width: theme.spacing(23.6),
    height: theme.spacing(23.6),
  },
}));

function SingleTimeCard({
  match,

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
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper className="m-4 p-1">
                      <Button onClick={() => setToggleMonday(!toggleMonday)}>
                        Monday
                      </Button>
                      <Button onClick={() => setToggleTuesday(!toggleTuesday)}>
                        Tuesday
                      </Button>
                      <Button
                        onClick={() => setToggleWenedsday(!toggleWenedsday)}
                      >
                        Wendsday
                      </Button>
                      <Button
                        onClick={() => setToggleThursdsday(!toggleThursday)}
                      >
                        Thursday
                      </Button>
                      <Button onClick={() => setToggleFriday(!toggleFriday)}>
                        Friday
                      </Button>
                      <Button
                        onClick={() => setToggleSatarday(!toggleSatarday)}
                      >
                        Satarday
                      </Button>
                      <Button onClick={() => setToggleSunday(!toggleSunday)}>
                        Sunday
                      </Button>
                    </Paper>
                  </Grid>
                  {/* monday */}
                  {toggleMonday && (
                    <Fragment>
                      <CardContent>
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
                        <MondayForm timecard_id={match.params.id} />

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
                      </CardContent>
                    </Fragment>
                  )}
                  {/* Tuesday */}
                  {toggleTuesday && (
                    <CardContent>
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
                      <TuesdayForm timecard_id={match.params.id} />

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
                    </CardContent>
                  )}
                  {/* Wendsday */}
                  {toggleWenedsday && (
                    <CardContent>
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
                      <WendsdayForm timecard_id={match.params.id} />

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
                    </CardContent>
                  )}
                  {/* Thursday */}
                  {toggleThursday && (
                    <CardContent>
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
                      <ThursdayForm timecard_id={match.params.id} />

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
                    </CardContent>
                  )}
                  {/* Friday */}
                  {toggleFriday && (
                    <CardContent>
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
                      <FridayForm timecard_id={match.params.id} />

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
                    </CardContent>
                  )}
                  {/* Satarday */}
                  {toggleSatarday && (
                    <CardContent>
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
                      <SatardayForm timecard_id={match.params.id} />

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
                    </CardContent>
                  )}

                  {/* Sunday */}
                  {toggleSunday && (
                    <CardContent>
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
                      <SundayForm timecard_id={match.params.id} />

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
                    </CardContent>
                  )}

                  <CardActions style={{ float: "right" }}>
                    <Button size="small" color="primary">
                      Share
                    </Button>
                    <Button size="small" color="primary">
                      Learn More
                    </Button>
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
});
export default connect(mapStateToProps, { getTimecard })(SingleTimeCard);
