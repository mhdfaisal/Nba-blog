import React from 'react';
import VideoList from '../Widgets/VideoList/VideoList';

class VideosMain extends React.Component{

    render(){
        return(
            <VideoList start={0} end={4} limit={4} type="card" />
        );
    }
}

export default VideosMain;