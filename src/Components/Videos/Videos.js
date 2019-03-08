import React from 'react';

import Posts from '../Widgets/Posts/Posts';
import RelatedVideos from './RelatedVideos/RelatedVideos';

class Videos extends React.Component{

    state={id:this.props.match.params.id}

    // static getDerivedStateFromProps(nextProp, prevState){
    //     if(nextProp.match.params.id!== prevState.id){
    //         return{
    //             id:nextProp.match.params.id
    //         }
    //     }
    //     return null;
    // }

    componentDidUpdate(prevProps){
        if(prevProps.match.params.id !== this.props.match.params.id){
             this.setState({id:this.props.match.params.id})
            // console.log("differ")
                window.scrollTo(0,0);
        }
    }


    render(){
        //console.log(this.state);
        return(
            <React.Fragment>
                <Posts postId={this.state.id} postUrl="videos" type="videos"/>
                <RelatedVideos videoId={this.state.id} />
            </React.Fragment>
        )
    }
}

export default Videos;