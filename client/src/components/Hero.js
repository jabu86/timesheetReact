import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(10, 0, 6),
    height: "60vh",
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}));

function Hero() {
  const classes = useStyles();
  return (
    <div className={classes.heroContent}>
      <Container maxWidth="sm" className="mb-5">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom

        >
          Weekly TimeSheet
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Keep track of you'r tasks, take control of you'r work, create you'r
          weekly timecard.
        </Typography>
      </Container>
    </div>
  );
}

export default Hero;
