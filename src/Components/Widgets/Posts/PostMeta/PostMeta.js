import React from 'react';
import moment from 'moment';
import './PostMeta.css';
class PostMeta extends React.Component{

    renderPostMeta(){
        switch(this.props.type){
            case "articles":if(this.props.data){
                            const {author,date} = this.props.data;
                                return(
                                    <div className="PostMeta">
                                        <div>Date: <span style={{fontWeight:"bold"}}>{moment(date).format(' DD/MM/YYYY ')}</span></div>
                                        <div>Author: <span style={{fontWeight:"bold"}}>{author}</span></div>
                                    </div>
                                );
                            }
                            else 
                                return <div>Loading...</div>
            default: return null
        }
    }

    render(){
        return(
            <React.Fragment>
                {this.renderPostMeta()}
            </React.Fragment>
        )
    }
}

export default PostMeta;