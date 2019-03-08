import React from 'react';
import VideoFrame from '../../../Widgets/VideoFrame/VideoFrame';
import './PostBody.css';

class PostBody extends React.Component{

    renderPostBody(){
        switch(this.props.type){
            case "articles": if(this.props.data){
                                const {title, image, body} = this.props.data;
                                return(
                                    <div className="PostBody">
                                        <h1 className="PostBody-title">{title}</h1>
                                        <div className="PostBody-image" style={{background:`url('/images/articles/${image}')`}}></div>
                                        <div className="PostBody-body">{body}</div>
                                    </div>
                                )
                                }
                                else
                                    return <div>Loading ...</div>
            case "videos" :   if(this.props.data){
                                const {title, url, body} = this.props.data;
                                return(
                                    <div className="PostBody">
                                        <h1 className="PostBody-title">{title}</h1>
                                            <VideoFrame src={url} />
                                        <div className="PostBody-body">{body}</div>
                                    </div>
                                )
                                }
                                else
                                    return <div>Loading ...</div>

            default: return <div>Post body</div>
        }
    }

    render(){
        return(
            <React.Fragment>
                {this.renderPostBody()}
            </React.Fragment>
        );
    }
}

export default PostBody;