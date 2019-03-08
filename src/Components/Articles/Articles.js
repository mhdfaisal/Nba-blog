import React from 'react';
import Posts from '../Widgets/Posts/Posts';

class Articles extends React.Component{

    render(){
        return(
            <Posts postId={this.props.match.params.id} postUrl="articles" type="articles"/>
        );
    }
}
export default Articles;