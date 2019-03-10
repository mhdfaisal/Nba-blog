import React from "react";

import PublicRoute from '../AuthRoutes/PublicRoute';
import PrivateRoute from '../AuthRoutes/PrivateRoute';
import Home from "../Home/Home";
import Articles from "../Articles/Articles";
import Videos from "../Videos/Videos";
import VideosMain from "../VideosMain/VideosMain";
import News from "../News/News";
import { Router, Route, Switch } from "react-router-dom";
import history from "../../history";
import Layout from "../../hoc/Layout/Layout";
import NotFound from "../NotFound/NotFound";
import SignIn from "../SignIn/SignIn";
import UserContext from "../../Context/UserContext";
import Dashboard from "../Dashboard/Dashboard";
import "../../firebase.js";

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <UserContext.Provider value={this.props.user}>
          <Layout>
            <Switch>
              <PublicRoute restricted={false} path="/" exact component={Home} />
              <PublicRoute restricted={false} path="/news" exact component={News} />
              <PublicRoute restricted={false} path="/videos" exact component={VideosMain} />
              <PublicRoute restricted={false} path="/videos/:id" exact component={Videos} />
              <PublicRoute restricted={false} path="/articles/:id" exact component={Articles} />
              <PublicRoute path="/signin" restricted={true} exact component={SignIn} />
              <PrivateRoute path="/dashboard" exact component={Dashboard} />
              <Route component={NotFound} />
            </Switch>
          </Layout>
        </UserContext.Provider>
      </Router>
    );
  }
}
export default App;
