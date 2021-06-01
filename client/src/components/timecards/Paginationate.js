import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Button, Paper } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  margin: {
    margin: theme.spacing(1),
  },
}));
function Paginationate({ timeCardPerPage, totalTimeCards, paginate }) {
  const classes = useStyles();
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalTimeCards / timeCardPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className={classes.root}>
      <Fragment>
        {" "}
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <ul className="pagination-link">
              {pageNumbers.map((number) => (
                <li key={number} className="paginationList">
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    className={classes.margin}
                    onClick={() => paginate(number)}
                  >
                    {number}
                  </Button>
                </li>
              ))}
            </ul>
          </Paper>
        </div>
      </Fragment>
    </div>
  );
}

export default Paginationate;
