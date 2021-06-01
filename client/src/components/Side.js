import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import SupervisedUserCircleSharpIcon from "@material-ui/icons/SupervisedUserCircleSharp";
import AccessAlarmsSharpIcon from "@material-ui/icons/AccessAlarmsSharp";
import MessageIcon from "@material-ui/icons/Message";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

    import {Link} from 'react-router-dom';

function Side() {
  return (
    <>

      <Grid item xs={12} sm={3} color="default">
        <Paper>
          <Card>
            <CardContent>
              <List>
                <ListItem button>
                  <SupervisedUserCircleSharpIcon color="primary" />
                  <Link to="mytimecard">
                    <ListItemText secondary="User's TimeCard"></ListItemText>
                  </Link>
                </ListItem>
                <Divider />
                <ListItem button>
                  <AccessAlarmsSharpIcon color="primary" />
                  <Link to="/timecard">
                    <ListItemText secondary="My TimeCard" />
                  </Link>
                </ListItem>
                <Divider />
                <ListItem button>
                  <MessageIcon color="primary" />{" "}
                  <Link to="/messages">
                    <ListItemText secondary="Messages" />
                  </Link>
                </ListItem>
                <Divider />
              </List>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
    </>
  );
}

export default Side;
