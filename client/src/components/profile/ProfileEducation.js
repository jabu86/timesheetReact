import React, { Fragment } from "react";

import moment from "moment";
import { Divider } from "@material-ui/core";

function ProfileEducation({
  education: { school, fieldofstudy, from, to, description, degree, current },
}) {
  return (
    <Fragment>
      <h3>{school}</h3>
      <p>
        <strong>From:</strong>
        {moment(from).format("YYYY/MM/DD")} <strong>To:</strong>
        {!to ? "Now" : moment(to).format("YYYY/MM/DD")}
      </p>
      <p>
        <strong>Field Of Study:</strong>
        {fieldofstudy}
      </p>
      <p>
        <strong>Qualification:</strong>
        {degree}
      </p>
      <p>
        <strong>Description:</strong>
        {description}
      </p>
      {description}
      <Divider />
    </Fragment>
  );
}

export default ProfileEducation;
