import * as firebase from 'firebase';

var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
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
