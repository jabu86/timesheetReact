import React, { Fragment } from "react";
import Hero from "./Hero";
import TimeCard from "./timecards/TimeCard";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

function Home({ isAuthenticated }) {
  if (isAuthenticated) {
    return <Redirect to="/timecard" />;
  }
  return (
    <Fragment>
      <Hero />
      <TimeCard />
    </Fragment>
  );
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(Home);
