import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {  Paper, Typography } from "@material-ui/core";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },

  large: {
    width: theme.spacing(40),
    height: theme.spacing(40),
  },
}));

function ProfileAbout({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      {
        (bio && (
          <Typography variant="h5">{name.trim().split(" ")}s Bio</Typography>
        ),
        (<Typography>{bio}</Typography>))
      }

      <Typography variant="h6">Skill Set</Typography>
      <ul className="skill-set">
        {skills.map((skill, index) => (
          <li key={index}>
            <DoneOutlineIcon />
            {skill}
          </li>
        ))}
      </ul>
    </Paper>
  );
}

export default ProfileAbout;
