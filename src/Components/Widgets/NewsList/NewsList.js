import React from "react";
import { Link } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import CardInfo from "../CardInfo/CardInfo";
import {
  firebaseArticles,
  firebaseLooper,
  firebaseTeams,
  firebase
} from "../../../firebase";

import LoadMore from "../LoadMore/LoadMore";
import "./NewsList.css";

class NewsList extends React.Component {
  state = {
    teams: [],
    newsList: [],
    newsListImages: [],
    startKey: "",
    limit: this.props.limit,
    length: 0,
    end: 0
  };

  componentDidMount() {
    this.getStartKey();
    this.getTotalRecords();
    this.fetchTeams();
  }

  getTotalRecords = () => {
    firebaseArticles.once("value").then(snapshot => {
      const data = firebaseLooper(snapshot);
      this.setState({ length: data.length });
    });
  };

  getStartKey = () => {
    let key = null;

    firebaseArticles
      .limitToFirst(1)
      .once("value")
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          key = childSnapshot.key;
        });
        this.setState({ startKey: key }, () => {
          this.fetchNews();
        });
      });
  };

  fetchNews = () => {
    let nextStartKey = "";
    let data = [];
    if (this.state.startKey) {
      firebaseArticles
        .orderByKey()
        .startAt(this.state.startKey)
        .limitToFirst(this.state.limit + 1)
        .once("value")
        .then(snapshot => {
          let c = 0;
          snapshot.forEach(childSnapshot => {
            if (c < this.state.limit) {
              data.push({ ...childSnapshot.val(), id: childSnapshot.key });
              c++;
            } else {
              nextStartKey = childSnapshot.key;
            }
          });
          return data;
        })
        .then(data => {
          let imageURLs = data.map((item, index) => {
            return new Promise(resolve => {
              firebase
                .storage()
                .ref("articles")
                .child(item.image)
                .getDownloadURL()
                .then(url => resolve(url));
            });
          });
          Promise.all(imageURLs).then(values => {
            this.setState({
              newsList: [...this.state.newsList, ...data],
              end: this.state.end + this.state.limit,
              startKey: nextStartKey,
              newsListImages: [...this.state.newsListImages, ...values]
            });
          });
        })
        .catch(err => console.log(err));
    } else {
      console.log("No records found !!");
    }
  };

  fetchTeams = () => {
    firebaseTeams
      .orderByChild("id")
      .once("value")
      .then(snapshot => {
        const data = firebaseLooper(snapshot);
        this.setState({ teams: [...data] });
      });
  };

  findTeamName = team => {
    let result = this.state.teams.find(item => {
      return item.teamId === parseInt(team);
    });
    if (result) {
      return result.name;
    } else {
      return null;
    }
  };

  loadMoreHandler = () => {
    this.fetchNews();
  };

  renderNewsList = () => {
    switch (this.props.type) {
      case "card":
        const newsList = this.state.newsList.map((item, index) => {
          return (
            <CSSTransition classNames="newsItem" timeout={500} key={index}>
              <div className="newsItem">
                <CardInfo
                  team={this.findTeamName(item.team)}
                  date={item.date}
                />
                <Link to={`articles/${item.id}`}> {item.title} </Link>
              </div>
            </CSSTransition>
          );
        });
        return newsList;

      case "imageCard":
        const imageNewsList = this.state.newsList.map((item, index) => {
          return (
            <CSSTransition classNames="newsItem" timeout={500} key={index}>
              <div className="newsImageItem">
                <div
                  className="newsItem-image left"
                  style={{
                    backgroundImage: `url("${
                      this.state.newsListImages[index]
                    }")`
                  }}
                />
                <div className="right">
                  <CardInfo
                    team={this.findTeamName(item.team)}
                    date={item.date}
                  />
                  <Link to={`articles/${item.id}`}> {item.title} </Link>
                </div>
              </div>
            </CSSTransition>
          );
        });
        return imageNewsList;

      default:
        return null;
    }
  };

  render() {
    return (
      <div>
        <TransitionGroup className="newsList">
          {this.renderNewsList()}
        </TransitionGroup>
        <LoadMore
          OnClick={this.loadMoreHandler}
          length={this.state.length}
          end={this.state.end}
          text="Load More News"
          loadMore={true}
        />
      </div>
    );
  }
}

export default NewsList;
