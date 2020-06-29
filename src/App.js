import React, { Component } from "react";
import axios from "axios";
import "./App.scss";
import firebase from "./Firebase/index.js";
import BookItem from "./components/BookItem.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
      userInput: "",
      bookShelf: [],
      readingList: [],
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
      console.log(this.state.bookShelf);
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
    }).then((response) => {
      let books = response.data.items;
      this.setState({
        books,
	  });

    });
  };

  handleChange = (event) => {
    this.setState({
      userInput: event.target.value,
    });
  };

  handleClick = () => {
    if (!this.state.userInput) return;
    let searchTerm = this.state.userInput;
    this.findBooks(searchTerm);
    this.setState({
      userInput: "",
    });
  };

  handleClickAdd = (index) => {
    const dbRef = firebase.database().ref("readingList");
    console.log(index);
    const objectPush = {
      title: this.state.books[index].volumeInfo.title,
      author: this.state.books[index].volumeInfo.authors,
      description: this.state.books[index].volumeInfo.description,
      genre: this.state.books[index].volumeInfo.categories,
      rating: this.state.books[index].volumeInfo.averageRating,
      imageLinks: this.state.books[index].volumeInfo.imageLinks,
	};
	
	for(let item in objectPush){
		if(objectPush[item] === undefined){
			 item = null;
			 console.log(objectPush[item])
		};
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
    return (
      <div className="App">
        <header>
          <h1>Page Turners</h1>
        </header>
        <input
          type="text"
          value={this.state.userInput}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          name="userInput"
        />
        <button onClick={this.handleClick}>Search Book</button>

        <h1>Books!</h1>
        <ul>
          {this.state.books.map((book, index) => {
			  
            // let searchedBook = book.volumeInfo;
            return (
              <li key={index}>
                <BookItem
                  key={index}
                  title={book.volumeInfo.title}
                  authors={book.volumeInfo.authors}
                  description={book.volumeInfo.description}
                  genre={book.volumeInfo.categories}
                  rating={book.volumeInfo.averageRating}
                //   thumbnail={book.volumeInfo.imageLinks.thumbnail}
                //   imageLinks={book.volumeInfo.imageLinks}
                  handleClickAdd={this.handleClickAdd}
                />
                <button onClick={() => this.handleClickAdd(index)}>
                  Add Book
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
export default App;
