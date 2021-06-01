import React, { Fragment, useEffect, useState } from "react";
import VerifiedUser from "@material-ui/icons/Person";
import AccessTimeIcon from "@material-ui/icons/AccessTimeTwoTone";
import HistoryIcon from "@material-ui/icons/HistoryTwoTone";
import LockOpenIcon from "@material-ui/icons/LockOpenTwoTone";
import Lock from "@material-ui/icons/LockRounded";
import VpnKeyIcon from "@material-ui/icons/VpnKeyTwoTone";
import SupervisedUserCircleOutlined from "@material-ui/icons/SupervisedUserCircleOutlined";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import { getNotification, markAsRead } from "../actions/notifications";
import DashboardIcon from "@material-ui/icons/DashboardTwoTone";
import { Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Avatar, Typography } from "@material-ui/core";
import moment from "moment";
function Header({
  auth: { isAuthenticated, loading, user },
  logout,
  getNotification,
  markAsRead,
  notification: { notifications },
}) {
  useEffect(() => {
    getNotification(user._id);
  }, [getNotification, user._id]);

  /**
   * Authinticated user links
   */
  const authLinks = (
    <Fragment>
      <Nav className="mr-auto auth-links">
        <Link to="/dashboard">
          <h5>
            {" "}
            <DashboardIcon />
            Dashboard
          </h5>
        </Link>
        <Link to="/profiles">
          <h5>
            {" "}
            <SupervisedUserCircleOutlined />
            Users's
          </h5>
        </Link>
        <NavDropdown
          className="align-top"
          title={
            <span
              className="badge badge-info p-2"
              style={{ borderRadius: "25px" }}
            >
              {notifications.length}
            </span>
          }
          id="collasible-nav-dropdown"
        >
          {notifications.length > 0 ? (
            notifications.map((noti) => (
              <NavDropdown.Item
                key={noti._id}
                href={`/timecard/${noti.timcard}`}
                className="bg-dark text-light"
              >
                <Avatar
                  variant="top"
                  src={noti.user.image}
                  alt={noti.user.name}
                  className="m-1"
                />
                <Typography component="p"> {noti.user.name}</Typography>
                <Typography component="p">{noti.message}</Typography>
                <Typography component="p" className="float-right">
                  {moment(noti.createdAt).calendar()}
                </Typography>
                <a
                  href="#"
                  onClick={(e) => markAsRead(noti._id)}
                  className="btn btn-primary btn-sm float-right mb-2"
                >
                  Mark As Read
                </a>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
              </NavDropdown.Item>
            ))
          ) : (
            <NavDropdown.Item href="#">No Approved Timecard's</NavDropdown.Item>
          )}
        </NavDropdown>

        <NavDropdown
          className="align-top"
          title={
            <img
              width="50"
              height="50"
              src={user.image}
              style={{ borderRadius: "25px", marginTop: "-10px" }}
              alt={user.name}
            />
          }
          id="collasible-nav-dropdown"
        >
          <NavDropdown.Item>
            <Link to={"/profile/" + user._id}>
              <VerifiedUser />
              Profile
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/my_time">
              <HistoryIcon /> My-Timcard's
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#!" onClick={logout}>
            <LockOpenIcon />
            SignOut
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Fragment>
  );

  /**
   * Guest links
   */
  const guestLinks = (
    <Fragment>
      <Nav className="guest-links">
        <Link to="/profiles">
          <h5>
            {" "}
            <SupervisedUserCircleOutlined />
            Users's
          </h5>
        </Link>

        <Link to="/register">
          <h5>
            <VpnKeyIcon />
            SignUp
          </h5>
        </Link>

        <Link to="/login">
          <h5>
            <Lock />
            SignIn
          </h5>
        </Link>
      </Nav>
    </Fragment>
  );

  return (
    <Fragment>
      <Navbar collapseOnSelect expand="xl" bg="light" variant="light">
        <Navbar.Brand>
          <Link to="/" color="inherit">
            <h2>
              {" "}
              <AccessTimeIcon />
              <em>
                <strong>W</strong>
                <small>T</small>{" "}
              </em>
            </h2>
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>

          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
        </Navbar.Collapse>
      </Navbar>
      {/* ************************************************** */}
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  notification: state.notification,
});
export default connect(mapStateToProps, {
  logout,
  getNotification,
  markAsRead,
})(Header);
