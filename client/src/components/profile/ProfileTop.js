import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { imageUpload } from "../../actions/auth";
import { Box, Button, Paper, Typography } from "@material-ui/core";
import LanguageIcon from "@material-ui/icons/Language";
import { Form } from "react-bootstrap";
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function ProfileTop({
  imageUpload,
  profile: {
    status,
    company,
    location,
    website,
    user: { _id, name, image },
  },
  auth,
}) {
  const classes = useStyles();
  const [file, setFile] = useState();
  const [filename, setFilename] = useState("Choose File");
  // const [uplaoadedFile, setUpLaoadedFile] = useState({});
  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };
  //Upload image
  const onSubmit = async (e) => {
    e.preventDefault();
    imageUpload(file, _id);
  };
  return (
    <Fragment>
      <Paper className={classes.paper}>
        <img
          src={image}
          alt={name}
          className="img-fluid img-thumbnail"
          style={{ width: "50%", borderRadius: "0.25em" }}
        />
        {auth.isAuthenticated &&
          auth.loading === false &&
          auth.user._id === _id && (
            <Form onSubmit={onSubmit} className="mt-2" >
              <Form.File
                id="custom-file-translate-scss"
                label="Profile Picture"
                lang="en"
                custom
                onChange={onChange}
              />
              <Typography>{filename}</Typography>
              <Button type="submit" color="primary" variant="contained">
                Upload
              </Button>
            </Form>
          )}
        <Typography variant="h4">{name}</Typography>
        <Typography variant="h6">
          {status} at {company && <Box component="span">{company}</Box>}
        </Typography>
        <Typography variant="h4">
          {location && <Box component="span">{location}</Box>}
        </Typography>

        {website && (
          <a
            href={website}
            variant="contained"
            color="secondary"
            rel="noopener noreferrer"
            target="_blank"
          >
            <LanguageIcon />
          </a>
        )}
      </Paper>
    </Fragment>
  );
}
const mapStateToProps = (state) => ({
  profileUser: state.profile,
  auth: state.auth,
});
export default connect(mapStateToProps, { imageUpload })(ProfileTop);
