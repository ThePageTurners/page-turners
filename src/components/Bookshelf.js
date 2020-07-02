import React, { Component } from "react";
import firebase from "../Firebase/index.js";
import ReactReadMoreReadLess from "react-read-more-less";

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
        readingList,
      });
    });
  }

  toggleRead = (index) => {
    const dbRef = firebase.database().ref("readingList");
    dbRef.once("value", (snapshot) => {
      const data = snapshot.val();
      if (data[index].isRead === true) {
        dbRef.child(index).update({ isRead: false });
      } else {
        dbRef.child(index).update({ isRead: true });
      }
    });
  };

  deleteBook = (index) => {
    const dbRef = firebase.database().ref("readingList");
    dbRef.child(index).remove();
  };

  render() {
    const numReadBooks = this.state.readingList.filter((item) => item.isRead)
      .length;
    return (
      <div>
        <h2>Bookshelf</h2>
        <h2>
          You have read {numReadBooks} out of {this.state.readingList.length}{" "}
        </h2>
        <ul>
          {this.state.readingList.map((book, index) => {
            return (
              <li key={index} className="book">
                <h3 className="title">{book.title ? `${book.title}` : "not available"}</h3>
                  <div className="imageContainer bookImage">
                    <img
                      src={
                        book.imageLinks
                          ? book.imageLinks.thumbnail
                          : "https://d827xgdhgqbnd.cloudfront.net/wp-content/uploads/2016/04/09121712/book-cover-placeholder.png"
                      }
                      alt={book.title}
                    />
                  </div>
                  <div className="writtenInfo info">
                    <p>
                      Author: {book.author ? `${book.author}` : "not available"}
                    </p>
                    <p>
                      Genre: {book.genre ? `${book.genre}` : "not available"}
                    </p>
                    <p>
                      Rating: {book.rating ? `${book.rating}/5` : "not available"}
                    </p>
                  </div>
                  {book.description ? (
                    <div className="bookDescription blurb">
                      <ReactReadMoreReadLess
                        className="moreOrLess"
                        charLimit={200}
                        readMoreText={<p className="moreOrLess">Read more ▼</p>}
                        readLessText={<p className="moreOrLess">Read less ▲</p>}
                        readMoreClassName="read-more-less--more"
                        readLessClassName="read-more-less--less"
                      >
                        {book.description}
                      </ReactReadMoreReadLess>
                    </div>
                  ) : null}
                  
                  <button className={`readButton ${book.isRead ? "toggledButton" : null}`} onClick={() => this.toggleRead(book.id)}>{ book.isRead ? "Mark as Unread": "Mark as Read" }</button>

                  <button
                    className="delButton"
                    onClick={() => this.deleteBook(book.id)}
                  >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Bookshelf;
