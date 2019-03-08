import React from 'react';
import './VideoFrame.css';

class VideoFrame extends React.Component{

    render(){
        return(
            <div className="iframe-container">
                <iframe src={`https://www.youtube.com/embed/${this.props.src}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="item"></iframe>
            </div>
        )
    }
}

export default VideoFrame;