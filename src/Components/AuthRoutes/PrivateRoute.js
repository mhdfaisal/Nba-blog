import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import UserContext from '../../Context/UserContext';

class PrivateRoute extends React.Component{

    static contextType = UserContext;

    render(){
        let {component:Comp, ...rest} = this.props;

        return(
            <Route {...rest} component={(props)=>(
                this.context ? <Comp {...props} /> : <Redirect to="/" />
            )} />
        )
    }

}
export default PrivateRoute;