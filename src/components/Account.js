import React, { Component, Fragment } from "react";
import axios from "axios";
import firebase from "../Firebase/index.js";
import BookItem from "./BookItem.js";
import bookPlaceHolder from "../assets/bookPlaceholder.png";
import "../App.scss";

class Account extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
      userInput: "",
      bookShelf: [],
      readingList: [],
      imageLinks: bookPlaceHolder,
    };
  }

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
        bookShelf: readingList,
      });
    });
  }

  findBooks = (searchItem) => {
    axios({
      url: `https://www.googleapis.com/books/v1/volumes?`,
      method: "GET",
      responseType: "JSON",
      params: {
        key: "AIzaSyD7Ytli5GUZu5S7FoaFn-sSMzsdWuwv_8E",
        q: searchItem,
      },
    })
      .then((response) => {
        let books = response.data.items;
        this.setState({
          books,
        });
      })
      .catch((error) => {
        alert(error);
        this.setState({
          hasError: false,
        });
      });
  };

  handleChange = (event) => {
    this.setState({
      userInput: event.target.value,
    });
  };

  handleClick = (e) => {
    e.preventDefault();

    if (!this.state.userInput) return;
    let searchTerm = this.state.userInput;
    this.findBooks(searchTerm);
    this.setState({
      userInput: "",
    });
  };

  handleClickAdd = (index) => {
    const dbRef = firebase.database().ref("readingList");

    const books = this.state.books;

    const objectPush = {
      title: books[index].volumeInfo.title,
      author: books[index].volumeInfo.authors,
      description: books[index].volumeInfo.description,
      genre: books[index].volumeInfo.categories,
      rating: books[index].volumeInfo.averageRating,
      imageLinks: books[index].volumeInfo.imageLinks,
      isRead: false,
    };

    for (let item in objectPush) {
      if (objectPush[item] === undefined) {
        delete objectPush[item];
      }
    }

    this.setState({
      readingList: objectPush,
    });
    dbRef.push(objectPush);
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (!this.state.userInput) return;
      let searchTerm = this.state.userInput;
      this.findBooks(searchTerm);
      this.setState({
        userInput: "",
      });
    }
  };

  render() {
    if (this.state.hasError) {
      return <p>There were no matches, please try again</p>;
    }
    return (
      <Fragment>
        {/* <Bookshelf /> */}
        <form>
          <input
            type="text"
            value={this.state.userInput}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            name="userInput"
          />
          <button onClick={this.handleClick}>Search Book</button>
        </form>
        {!this.state.books ? (
          <p>There were no matches, please try again</p>
        ) : (
          <ul className="bookSearch">
            {this.state.books.map((book, index) => {
              if (book.volumeInfo.imageLinks === undefined) {
                book.volumeInfo.imageLinks = this.state.imageLinks;
              }

              return (
                <li key={index}>
                  <BookItem
                    key={index}
                    title={book.volumeInfo.title}
                    authors={book.volumeInfo.authors}
                    description={book.volumeInfo.description}
                    genre={book.volumeInfo.categories}
                    rating={book.volumeInfo.averageRating}
                    thumbnail={book.volumeInfo.imageLinks.thumbnail}
                    handleClickAdd={this.handleClickAdd}
                  />
                  <button className="addBook" onClick={() => this.handleClickAdd(index)}>
                    Add Book
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </Fragment>
    );
  }
}
export default Account;
