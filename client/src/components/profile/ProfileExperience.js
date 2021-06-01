import React,{Fragment} from "react";
import moment from "moment";
import { Divider } from "@material-ui/core";

function ProfileExperience({
  experience: { company, title, location, current, from, to, description },
}) {
  return (
    <Fragment>
      <h3>{company}</h3>
      <p>
        <strong>From:</strong>
        {moment(from).format("YYYY/MM/DD")} <strong>To:</strong>
        {!to ? "Now" : moment(to).format("YYYY/MM/DD")}
      </p>
      <p>
        <strong>Position:</strong>
        {title}
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

export default ProfileExperience;
