import React from 'react';
import Home from '../Home/Home';
import Articles from '../Articles/Articles';
import Videos from '../Videos/Videos';
import VideosMain from '../VideosMain/VideosMain';
import News from '../News/News';
import {Router, Route, Switch} from 'react-router-dom';
import history from '../../history';
import Layout from '../../hoc/Layout/Layout';
import NotFound from '../NotFound/NotFound';
import SignIn from '../SignIn/SignIn';
import UserContext from '../../Context/UserContext';
import Dashboard from '../Dashboard/Dashboard';
import '../../firebase.js';

class App extends React.Component{


    render(){
        return(
            <Router history={history}>
                <UserContext.Provider value={this.props.user}>
                <Layout>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/news" exact component={News} />
                    <Route path="/videos" exact component={VideosMain} />
                    <Route path="/videos/:id" exact component={Videos} />
                    <Route path="/articles/:id" exact component={Articles} />
                    <Route path="/signin" exact component={SignIn} />
                    <Route path="/dashboard" exact component={Dashboard} />
                    <Route component={NotFound} />
                </Switch>
                </Layout>
                </UserContext.Provider>
            </Router>
        )
    }
}
export default App;