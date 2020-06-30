import React, { Component, Fragment } from "react";

// * * * * ROUTER ELEMENTS
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Welcome from './components/landing';
import Account from './Account/index';
// * * * * ROUTER ELEMENTS END

import axios from "axios";
import firebase from "./Firebase/index.js";
import BookItem from "./components/BookItem.js";

import Bookshelf from "./components/Bookshelf.js";
import bookPlaceHolder from "./assets/bookPlaceholder.png";
import githubLogo from './assets/github.svg';
import "./App.scss";

const Home = () => {
  return <h2>I’M THE HOME PAGE</h2>;
};

class App extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     books: [],
  //     userInput: "",
  //     bookShelf: [],
  //     readingList: [],
  //     imageLinks: bookPlaceHolder,
  //   };
  // }

  // componentDidMount() {
  //   // For retrieval of bookshelf list***
  //   const dbRef = firebase.database().ref("readingList");
  //   dbRef.on("value", (snapshot) => {
  //     const readingList = [];
  //     const data = snapshot.val();

  //     for (let key in data) {
  //       readingList.push({
  //         id: key,
  //         bookList: data[key],
  //       });
  //     }
  //     this.setState({
  //       bookShelf: readingList,
  //     });
  //   });
  // }

//   findBooks = (searchItem) => {
//     axios({
//       url: `https://www.googleapis.com/books/v1/volumes?`,
//       method: "GET",
//       responseType: "JSON",
//       params: {
//         key: "AIzaSyD7Ytli5GUZu5S7FoaFn-sSMzsdWuwv_8E",
//         q: searchItem,
//       },
//     }).then((response) => {
//       let books = response.data.items;
//       this.setState({
//         books,
//       })
//     }).catch((error)=>{
//       alert(error)
//       this.setState({
//         hasError: false
//       })
//     })
//   };

// const Home = () => {
//   return (
//         <h2>I'M THE HOME PAGE</h2>
//   );
// };

//   handleClickAdd = (index) => {
//     const dbRef = firebase.database().ref("readingList");

//     const books = this.state.books;

//     const objectPush = {
//       title: books[index].volumeInfo.title,
//       author: books[index].volumeInfo.authors,
//       description: books[index].volumeInfo.description,
//       genre: books[index].volumeInfo.categories,
//       rating: books[index].volumeInfo.averageRating,
//       imageLinks: books[index].volumeInfo.imageLinks,
//       isRead: false,
//     };
      
	
// 	for (let item in objectPush) {
//     if (objectPush[item] === undefined) {
//       delete objectPush[item];
//     }
//   }
  
//   this.setState({
// 	  readingList: objectPush,
// 	});
// 	dbRef.push(objectPush);
//   };

  render() {

  
    return (
      <Router>
        <div className="App">

          <header>
            <h1>Page Turners</h1>

            <nav className="headerNav">
              <ul> 
                <li>
                  <Link to="/">Landing</Link>
                </li> 
                <li>
                  <Link to="/home">Home</Link> 
                </li>
                <li>
                  <Link to="/account">My Reading Lists</Link>
                </li> 
              </ul>
          </nav> 

          </header>
          
          <main>
            <div className="pageReturn">

              <Route exact path="/" component={Welcome} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/account" component={Account} />

            </div>

            <div className="pageReturnAside">

              <h3>I AM A TITLE</h3>
              <p>Hello</p>

            </div>

          </main>

          <footer>
            <div className="groupMembers">
              <h3>Group Project By:</h3>
              <ul>
                <li>
                  <img src={githubLogo} alt="Github Logo"/>
                  <a href="https://github.com/daibhidhdwaum">@daibhidhdwaum</a>
                </li>
                <li>
                  <img src={githubLogo} alt="Github Logo"/>
                  <a href="https://github.com/vigyan-k">@vigyan-k</a> 
                </li>
                <li>
                  <img src={githubLogo} alt="Github Logo"/>
                  <a href="https://github.com/OksanaSam">@OksanaSama</a>
                </li>
                <li>
                  <img src={githubLogo} alt="Github Logo"/>
                  <a href="https://github.com/amay-zingg">@amay-zingg</a>
                </li>
              </ul>
            </div>
            </footer>
          
        </div>
        </Router>
          


    )}};

export default App;
