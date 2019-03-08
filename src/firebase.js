import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBxzpepucoMtREz9xDJoPZVvckvtO4N4Q4",
    authDomain: "nba-full-68543.firebaseapp.com",
    databaseURL: "https://nba-full-68543.firebaseio.com",
    projectId: "nba-full-68543",
    storageBucket: "nba-full-68543.appspot.com",
    messagingSenderId: "149159280902"
  };
  firebase.initializeApp(config);

  const firebaseDb = firebase.database();

  const firebaseArticles = firebaseDb.ref('articles');
  const firebaseTeams = firebaseDb.ref('teams');
  const firebaseVideos = firebaseDb.ref('videos');

  const firebaseLooper = (snapshot)=>{
    const data =[];
    snapshot.forEach((childSnapshot)=>{
      data.push({...childSnapshot.val(), id:childSnapshot.key});
    });
    return data;
  }

  export {
    firebaseDb,
    firebaseArticles,
    firebaseTeams,
    firebaseVideos,
    firebaseLooper,
    firebase
  }