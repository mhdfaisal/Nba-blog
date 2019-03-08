import React from 'react';
import {Link} from 'react-router-dom'
import {TransitionGroup, CSSTransition} from 'react-transition-group';

import CardInfo from '../CardInfo/CardInfo';
import {firebaseArticles, firebaseLooper, firebaseTeams} from '../../../firebase';

import LoadMore from '../LoadMore/LoadMore';
import './NewsList.css';

class NewsList extends React.Component{

    state={teams:[], newsList:[], start:this.props.start, end:this.props.end , limit:this.props.limit, length:0}

    componentDidMount(){
        this.fetchNews();
        this.getTotalRecords();
        this.fetchTeams();
    }

    getTotalRecords = ()=>{

        firebaseArticles.once('value')
        .then((snapshot)=>{
            const data = firebaseLooper(snapshot);
            this.setState({length:data.length});
        })
    }

    fetchNews=()=>{

        firebaseArticles.orderByChild('id').startAt(this.state.start).endAt(this.state.end-1).once('value')
        .then((snapshot)=> {
            const data = firebaseLooper(snapshot);
            return data;
        })
        .then((data) =>{
            this.setState({newsList:[...this.state.newsList, ...data], start:this.state.end, end:this.state.end + this.state.limit});
        })
        .catch((err)=> console.log(err));
        
    }

    fetchTeams = ()=>{

        firebaseTeams.orderByChild('id').once('value')
        .then((snapshot)=> {
            const data = firebaseLooper(snapshot);
            this.setState({teams:[...data]})
        })
    }

    findTeamName = (team)=>{
        let result = this.state.teams.find(item => {
            return item.teamId === team; 
               
        });
        if(result){
            return result.name;
        }
        else{
            return null;
        }
    }

    loadMoreHandler=()=>{
        this.fetchNews();
    }

    renderNewsList= ()=> {
        switch(this.props.type){
            case "card": const newsList = this.state.newsList.map((item,index)=>{
                return (
                    <CSSTransition classNames="newsItem" timeout={500} key={index}>
                        <div className="newsItem">
                            <CardInfo team={this.findTeamName(item.team)} date={item.date} />
                            <Link to={`articles/${item.id}`}> {item.title} </Link>
                        </div>
                    </CSSTransition>
                );
            });
            return newsList;


            case "imageCard": const imageNewsList = this.state.newsList.map((item,index)=>{
                return (
                    <CSSTransition classNames="newsItem" timeout={500} key={index}>
                        <div className="newsImageItem">
                            <div className="newsItem-image left" style={{backgroundImage:`url("images/articles/${item.image}")`}}></div>
                            <div className="right">
                                <CardInfo team={this.findTeamName(item.team)} date={item.date} />
                                <Link to={`articles/${item.id}`}> {item.title} </Link>
                            </div>
                        </div>
                    </CSSTransition>
                );
            });
            return imageNewsList;

            default: return null;
        }
    }


    render(){
        // console.log(this.state.newsList)
        return(
            <div>
                <TransitionGroup className="newsList">
                    {this.renderNewsList()}
                </TransitionGroup>
                <LoadMore OnClick={this.loadMoreHandler} length={this.state.length} end={this.state.end} text="Load More News" loadMore={true}/>
            </div>
        );
    }
}

export default NewsList;