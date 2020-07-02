import React, { Component } from "react";
import firebase from "../Firebase/index.js";

class Bookshelf extends Component {
    constructor() {
      super();
      this.state = {
        readingList: [],
      };
    }
  
    componentDidMount() {
      const dbRef = firebase.database().ref("readingList");
      dbRef.on("value", (snapshot) => {
        const data = snapshot.val();
        const readingList = [];
        for (let key in data) {
          readingList.push({
            id: key,
            ...data[key],
          });
        }
        this.setState({
          readingList 
        });
      });
    }
  
      
      toggleRead = (index) => {
        const dbRef = firebase.database().ref("readingList");
        dbRef.once("value", (snapshot) => {
        const data = snapshot.val();
        if (data[index].isRead === true) {
          dbRef.child(index).update({isRead: false})
        } else {
          dbRef.child(index).update({isRead: true})
        }
      });
      }
  
      deleteBook = (index) => {
        const dbRef = firebase.database().ref("readingList");
        dbRef.child(index).remove();
      }
      
      render() {
        const numReadBooks = this.state.readingList.filter(item => item.isRead).length;
        // const readRatio = Math.round(numReadBooks / this.state.readingList.length);
        return (
            <div>
                <h2>Bookshelf</h2>
                <h2>You have read {numReadBooks} out of {this.state.readingList.length} </h2>
                <ul>
                    {this.state.readingList.map((book, index) => {
                        return(
                    <li key={index}>
                        <p>Title: { book.title ? `${book.title}` : "not available" }</p>
                        <p>Author: { book.author ? `${book.author}` : "not available" }</p>
                        <p>Description: { book.description ? `${book.description}` : "not available" }</p> 
                        <p>Genre: { book.genre ? `${book.genre}` : "not available" }</p>
                        <p>Rating: { book.rating ? `${book.rating}` : "not available" }</p>
                        <img src={ book.imageLinks ? book.imageLinks.thumbnail : "https://d827xgdhgqbnd.cloudfront.net/wp-content/uploads/2016/04/09121712/book-cover-placeholder.png" } alt={book.title}/>
                        <button onClick={() => this.toggleRead(book.id)}>Mark as Read</button>
                        <button onClick={() => this.deleteBook(book.id)}>Delete</button>
                    </li>
                    );
                  })}
                </ul>   
            </div>
          )
    }
  }
  
  export default Bookshelf;