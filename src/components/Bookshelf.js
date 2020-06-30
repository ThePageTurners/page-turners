import React, { Component } from "react";
import firebase from "../Firebase/index.js";

class Bookshelf extends Component {
    constructor() {
      super();
      this.state = {
        readingList: [],
      };
    }


    // componentDidMount() {
    //     // Retrieving bookshelf items
    //     const dbRef = firebase.database().ref("readingList");
    //     dbRef.on("value", (snapshot) => {
    //     //   const readingList = [];
    //       const data = snapshot.val();
    //       console.log("Data", data);
    //       const retrievedArray = [];
    //       for (let item in data) {
    //         retrievedArray.push(item.description)
    //       };
    //     //   retrievedArray.push(data);
    //       console.log(retrievedArray);
    //       this.setState({
    //         readingList: retrievedArray,
    //       });
    //       console.log(this.state.readingList);
    //     });
    //   }
    

      componentDidMount() {
        // For retrieval of bookshelf list***
        const dbRef = firebase.database().ref("readingList");
        dbRef.on("value", (snapshot) => {
          const readingList = [];
          const data = snapshot.val();
    
          for (let key in data) {
            readingList.push({
              id: key,
              bookList: data[key],
            });
          }
          this.setState({
            readingList: readingList,
          });
        });
      }

    
    toggleRead = (index) => {
        this.state.readingList[index].isRead = true;
        console.log(this.state.readingList[index].isRead);
    }


    render() {
        return (
            <div>
                <h2>Bookshelf</h2>
                <ul>
                    {this.state.readingList.map((book, index) => {
                        return(
                    <li key={index}>
                        <p>Title: {book.bookList.title}</p>
                        <p>Author: {book.bookList.author}</p>
                        <p>Description: {book.bookList.description}</p>
                        <p>Genre: {book.bookList.genre}</p>
                        <p>Rating: {book.bookList.rating}</p>
                        <img src={book.bookList.imageLinks.thumbnail} alt={book.bookList.title}/>
                        <button onClick={() => this.toggleRead(index)}>Mark as Read</button>
                    </li>
                    );
                 })}
                </ul>   
            </div>
        )
    }
}

export default Bookshelf;