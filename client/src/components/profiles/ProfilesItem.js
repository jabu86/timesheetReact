import React, { Fragment } from "react";
import { Avatar, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Fade from "react-reveal/Fade";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },

  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

function ProfilesItem({ profile }) {
  const classes = useStyles();
  return (
    <Fragment>
      <Fade cascade>
        <div className="user-info">
          <div>
            <Avatar
              src={profile.user.image}
              alt={profile.user.name}
              className={classes.large}
            />
          </div>
          <div>
            <Typography variant="h6">
              <strong>{profile.user.name}</strong>
            </Typography>
            <Typography>
              {profile.status} at{" "}
              {profile.company && <span>{profile.company}</span>}
            </Typography>
            <Typography>
              {profile.location && <span>{profile.location}</span>}
            </Typography>
          </div>
          <div>
            <List className={classes.root}>
              {profile.skills.slice(0, 4).map((skill, index) => (
                <Fragment key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <DoneOutlineIcon />
                    </ListItemAvatar>
                    <ListItemText
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            {skill}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </Fragment>
              ))}
            </List>
          </div>
          <Link
            className="btn btn-primary"
            size="large"
            to={`/profile/${profile.user._id}`}
          >
            View
          </Link>
        </div>
      </Fade>
    </Fragment>
  );
}

export default ProfilesItem;
