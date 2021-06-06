import React, { Fragment, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import moment from "moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteTimecard, approveTimecard } from "../../actions/timecards";
import EditTimeCard from "./EditTimeCard";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import TimeToLeave from "@material-ui/icons/Timelapse";
import ViewWeekIcon from "@material-ui/icons/ViewWeek";
import { Button, IconButton } from "@material-ui/core";
import TextTruncate from "react-text-truncate";
import TotalHoursCount from "./TotalHoursCount";
const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "0.5em",
  },

  cardContent: {
    flexGrow: 1,
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
function AllTimeCards({
  timecard,
  deleteTimecard,
  auth: { isAuthenticated, user },
  approveTimecard,
}) {
  const classes = useStyles();
  const [status, setStatus] = useState(true);
  const [total] = useState(
    timecard.monday &&
      timecard.tuesday &&
      timecard.wendsday &&
      timecard.thursday &&
      timecard.friday &&
      timecard.satarday &&
      timecard.sunday
      ? timecard.monday.reduce((a, v) => (a = a + v.hours), 0) +
          timecard.tuesday.reduce((a, v) => (a = a + v.hours), 0) +
          timecard.wendsday.reduce((a, v) => (a = a + v.hours), 0) +
          timecard.thursday.reduce((a, v) => (a = a + v.hours), 0) +
          timecard.friday.reduce((a, v) => (a = a + v.hours), 0) +
          timecard.satarday.reduce((a, v) => (a = a + v.hours), 0) +
          timecard.sunday.reduce((a, v) => (a = a + v.hours), 0)
      : ""
  );

  const approve = (status, id) => {
    setStatus(status);
    approveTimecard(status, id, total);
  };

  return (
    <Fragment>
      <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={4}>
              <Link to={"/profile/" + timecard.user._id}>
                {" "}
                <Avatar
                  src={timecard.user.image}
                  alt={timecard.user.name}
                  title={timecard.user.name}
                  className={classes.cardMedia}
                />
              </Link>
              <Typography>{timecard.user.name}</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Chip
                className="chip-font"
                variant="outlined"
                size="small"
                color="primary"
                label={"Project: " + timecard.project}
              />
              <Divider />
              <Chip
                className="chip-font"
                variant="outlined"
                size="small"
                color="primary"
                label={"Company: " + timecard.company}
              />
              <Divider />
              <Chip
                className="chip-font"
                variant="outlined"
                size="small"
                color="primary"
                label={
                  "Week from: " + moment(timecard.from).format("YYYY-MM-DD")
                }
              />
              <Divider />
              <Chip
                className="chip-font mb-4"
                variant="outlined"
                size="small"
                color="primary"
                label={
                  "Week ending: " + moment(timecard.to).format("YYYY-MM-DD")
                }
              />
            </Grid>
          </Grid>

          <CardContent className={classes.cardContent}>
            <Typography variant="h6">
              <TextTruncate
                line={1}
                element="span"
                truncateText="…"
                text={timecard.description}
                textTruncateChild={
                  <Button
                    size="small"
                    color="primary"
                    href={"/timecard/" + timecard._id}
                  >
                    Learn More
                  </Button>
                }
              />
            </Typography>
            <Typography style={{ float: "right" }}>
              <small>
                <em>{moment(timecard.createdAt).calendar()}</em>
              </small>
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h6" style={{ float: "right" }}>
              Total Hours: {total}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton
              href={`/timecard/${timecard._id}`}
              size="small"
              color="primary"
            >
              <ViewWeekIcon />
            </IconButton>
            {isAuthenticated && user._id === timecard.user._id ? (
              <EditTimeCard timecard={timecard} />
            ) : (
              ""
            )}
            {isAuthenticated && user._id === timecard.user._id ? (
              <IconButton onClick={() => deleteTimecard(timecard._id)}>
                <HighlightOffIcon size="small" color="secondary" />
              </IconButton>
            ) : (
              ""
            )}
            {timecard.status === false &&
            isAuthenticated &&
            user.role === "manager" ? (
              <IconButton
                size="small"
                onClick={(e) => approve(status, timecard._id, total)}
              >
                <TimeToLeave size="small" color="primary" />
              </IconButton>
            ) : (
              ""
            )}
          </CardActions>
        </Card>
      </Grid>
    </Fragment>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { deleteTimecard, approveTimecard })(
  AllTimeCards
);
