import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./components/Header";
import Home from "./components/Home";
import TimeCard from "./components/timecards/TimeCard";
import SingleTimeCard from "./components/timecards/SingleTimeCard";
import UserTimeCards from "./components/timecards/UserTimeCards";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/dashboard/Dashboard";
import Admin from "./components/dashboard/Admin";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile-form/CreateProfile";
import EditProfile from "./components/profile-form/EditProfile";
import AddExperience from "./components/profile-form/AddExperience";
import AddEducation from "./components/profile-form/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AlertMsg from "./components/AlertMsg";
//Redux
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <CssBaseline />
          {/* header */}
          <Header />
          <main>
            <Route exact path="/" component={Home} />
            <section className="container">
              <AlertMsg />
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/profiles" component={Profiles} />
                <Route exact path="/profile/:id" component={Profile} />
                <Route exact path="/timecard/:id" component={SingleTimeCard} />
                <PrivateRoute exact path="/timecard" component={TimeCard} />
                <PrivateRoute
                  exact
                  path="/timecard/page/:pageNumber"
                  component={TimeCard}
                />
                <PrivateRoute exact path="/my_time" component={UserTimeCards} />
                <PrivateRoute
                  path="/my_time/page/:pageNumber"
                  component={UserTimeCards}
                  exact
                />

                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
                <PrivateRoute exact path="/admin" component={Admin} />
              </Switch>
            </section>
          </main>
          {/* Footer */}
          <Footer />
          {/* End footer */}
        </React.Fragment>
      </Router>
    </Provider>
  );
}

export default App;
