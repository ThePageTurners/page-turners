import React, { Component, Fragment } from "react";
import axios from "axios";
import firebase from "../Firebase/index.js";
import BookItem from "./BookItem.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import "../App.scss";


class Search extends Component {
	constructor() {
		super();
		this.state = {
			books: [],
			userInput: "",
		};
	}

	searchIcon = <FontAwesomeIcon icon={faSearch} size="1x"/>;

	findBooks = (searchItem) => {
		axios({
			url: "https://www.googleapis.com/books/v1/volumes?",
			method: "GET",
			responseType: "JSON",
			params: {
				key: "AIzaSyD7Ytli5GUZu5S7FoaFn-sSMzsdWuwv_8E",
				q: searchItem,
				maxResults: 40,
			}
		})
			.then((response) => {
				let books = response.data.items;
				this.setState({
					books
				});
			})
			.catch((error) => {
				alert(error);
				this.setState({
					hasError: false
				});
			});
	};

	handleChange = (event) => {
		this.setState({
			userInput: event.target.value
		});
	};

	handleSearchClick = () => {
		if (!this.state.userInput) return;
		let searchTerm = this.state.userInput;
		this.findBooks(searchTerm);
		this.setState({
			userInput: ""
		});
	};

	 addFirstBook = (bookToAdd, index) => {
        const dbRef = firebase.database().ref("readingList");
        dbRef.push(bookToAdd);
            this.setState({
                books: this.state.books.map((book, ind) => {
                    if (ind !== index) return book;
                    const addedBook = {...book};
                    addedBook.isAdded = true;
                    return addedBook;
                }),
            });
    };

	findMatches = (objectToPush, index) => {
        const dbRef = firebase.database().ref("readingList");
        dbRef.once("value", (snapshot) => {
            const data = snapshot.val();
            const retrievedArray = Object.values(data);
            const valuesArray = Object.values(retrievedArray);
            let idArray = [];
            valuesArray.map(element => {
                idArray.push(element.identity);
				return idArray;
            });
            let areThereMatches = idArray.includes(objectToPush.identity);
            if (areThereMatches) {
                let alertImage;
                objectToPush.imageLinks ? alertImage = objectToPush.imageLinks.thumbnail : alertImage = "https://d827xgdhgqbnd.cloudfront.net/wp-content/uploads/2016/04/09121712/book-cover-placeholder.png";
                Swal.fire({title: "Oops...", imageUrl: alertImage, imageWidth: 400, imageHeight: 400, text: `It looks like you have already added  ${objectToPush.title} to your bookshelf`, confirmButtonText: "Cool"});
            } else {
                dbRef.push(objectToPush);
                    this.setState({
                        books: this.state.books.map((book, ind) => {
                            if (ind !== index) return book;
                            const addedBook = {...book};
                            addedBook.isAdded = true;
                            return addedBook;
                        }),
                    });
            };
        });
    };

	 handleClickAdd = (index) => {
        const dbRef = firebase.database().ref("readingList");
        const { title, authors, description, categories, averageRating, imageLinks } = this.state.books[index].volumeInfo;
        let author;
        if (authors && authors.length > 1){
            author = authors.join(", ");
         } else {
             author = authors;
        };
        const objectPush = {
          title: title,
          author: author,
          description,
          genre: categories,
          rating: averageRating,
          imageLinks,
          isRead: false,
          identity: this.state.books[index].id
        };

        for (let item in objectPush) {
            if (objectPush[item] === undefined){
                delete objectPush[item];
            }
        };

        dbRef.once("value", (snapshot) => {
            const data = snapshot.val();
            if (!data){
                this.addFirstBook(objectPush, index);
            } else {
                this.findMatches(objectPush, index);
            };
        });
    };


	handleKeyPress = (e) => {
		if (e.key === "Enter") {
			if (!this.state.userInput) return;
			let searchTerm = this.state.userInput;
			this.findBooks(searchTerm);
			this.setState({
				userInput: ""
			});
		}
  };
  

	render() {
		return (
			<Fragment>
				<input
					type="text"
					placeholder="Title / Author"
					value={this.state.userInput}
					onChange={this.handleChange}
					onKeyPress={this.handleKeyPress}
					name="userInput"
				/>
				<button className="searchButton" onClick={this.handleSearchClick}>Search Book</button>
				<button className="searchButton" onClick={this.handleSearchClick}>{this.searchIcon}</button>
				{!this.state.books ? (
					<h2>There were no matches, please try again</h2>
				) : (
					<ul className="bookSearch">
						{this.state.books.map((book, index) => {
							const  { title, authors, description, categories, averageRating, imageLinks } = book.volumeInfo;
							return (
							<li className="listResult" key={index}>
								<BookItem
									key={index}
									title={title}
									authors={authors && authors.length > 1 ? authors.join(", ") : authors}
									description={description}
									genre={categories}
									isAdded={book.isAdded}
									rating={averageRating}
									thumbnail={imageLinks ? imageLinks.thumbnail : "https://d827xgdhgqbnd.cloudfront.net/wp-content/uploads/2016/04/09121712/book-cover-placeholder.png"}
									handleClickAdd={this.handleClickAdd}
								/>
								<button className={book.isAdded ? "toggledButton" : null} onClick={() => this.handleClickAdd(index)}>
									{!book.isAdded ? "Add Book": "Added"}
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
export default Search;