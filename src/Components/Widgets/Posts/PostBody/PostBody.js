import React from 'react';
import VideoFrame from '../../../Widgets/VideoFrame/VideoFrame';
import {firebase} from '../../../../firebase';
import './PostBody.css';

class PostBody extends React.Component{

    _isMounted = false;

    state = {imageURL:''};

    componentDidMount(){
        this._isMounted = true;
    }

    componentDidUpdate(prevProps){
        if(prevProps !== this.props.data && this.props.data.image!==''){
            this.getImageURL(this.props.data.image);
        }
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    getImageURL = (imageName)=>{
        firebase.storage().ref("articles")
        .child(imageName).getDownloadURL()
        .then(url=>{
            if(this._isMounted){
                this.setState({
                    imageURL:url
                })
            }
        })
    }

    renderPostBody(){
        switch(this.props.type){
            case "articles": if(this.props.data){
                                const {title, body} = this.props.data;
                                return(
                                    <div className="PostBody">
                                        <h1 className="PostBody-title">{title}</h1>
                                        <div className="PostBody-image" style={{background:`url('${this.state.imageURL}')`}}></div>
                                        <div className="PostBody-body" dangerouslySetInnerHTML={{__html:body}}></div>
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