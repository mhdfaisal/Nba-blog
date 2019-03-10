import React from 'react';
import UserContext from '../../Context/UserContext';
import {Route, Redirect} from 'react-router-dom';

class PublicRoute extends React.Component{

    static contextType = UserContext;

    render(){
        let {component:Comp, ...rest} = this.props;
        if(!this.props.restricted){
            return <Route {...rest} component={Comp} />
        }
        else{
            return this.context? <Redirect to="/dashboard" /> : <Route {...rest} component={Comp} />
        }
    }
}

export default PublicRoute;