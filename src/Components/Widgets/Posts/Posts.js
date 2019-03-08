import React from 'react';
import {withRouter} from 'react-router-dom';
import PostHeader from './PostHeader/PostHeader';
import PostMeta from './PostMeta/PostMeta';
import PostBody from './PostBody/PostBody';
import { firebaseDb, firebaseTeams, firebaseLooper} from '../../../firebase';
import './Post.css';

class Posts extends React.Component{

    state={article:{}, team:[], postId:this.props.postId}

    componentDidMount(){
         this.fetchPost(this.state.postId);
    }

    componentDidUpdate(prevProps){
        if(prevProps.postId !== this.props.postId){
             this.setState({postId:this.props.match.params.id})
             this.fetchPost(this.props.postId);
        }
    }


    fetchPost= (postId)=>{

        const url =this.props.postUrl;

        switch(url){
            case "articles" : firebaseDb.ref(`articles/${postId}`).once('value')
                                .then((snapshot)=>{
                                    const data = snapshot.val();
                                    return data;
                                })
                                .then((data)=>{
                                    this.setState({article:{...data}})
                                    this.fetchTeam(data.team);
                                })
                                .catch(e=> console.log(e));
                                break;

            case "videos": firebaseDb.ref(`videos/${postId}`).once('value')
                            .then((snapshot)=>{
                                const data = snapshot.val();
                                return data;
                            })
                            .then((data)=>{
                                this.setState({article:{...data}});
                                this.fetchTeam(data.team);
                            })
                            .catch(e=> console.log(e));
                            break;

            default: console.log("not found");
        }
    }

    fetchTeam = (teamId)=>{
        firebaseTeams.orderByChild('id').equalTo(teamId).once('value')
        .then(snapshot =>  {
          const data = firebaseLooper(snapshot);
          return data;
        })
        .then(data=> {
            this.setState({team:[...this.state.team, ...data]});
        })
        .catch(e => console.log(e));
    }

    render(){
         //console.log(this.state);
        return(
            <div className="Post">
                <PostHeader data={this.state.team[this.state.team.length - 1]}/>
                <PostMeta data={this.state.article} type={this.props.type}/>
                <PostBody data={this.state.article} type={this.props.type}/>
            </div>
        )
    }
}

export default withRouter(Posts);