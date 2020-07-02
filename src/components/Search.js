import React, { Component, Fragment } from 'react';
import axios from 'axios';
import firebase from '../Firebase/index.js';
import BookItem from './BookItem.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

// import bookPlaceHolder from '../assets/bookPlaceholder.png';
import Swal from 'sweetalert2';
import '../App.scss';


class Search extends Component {
	constructor() {
		super();
		this.state = {
			books: [],
			userInput: '',
			// imageLinks: bookPlaceHolder
		};
	}

	searchIcon = <FontAwesomeIcon icon={faSearch} size="1x"/>;

	findBooks = (searchItem) => {
		axios({
			url: `https://www.googleapis.com/books/v1/volumes?`,
			method: 'GET',
			responseType: 'JSON',
			params: {
				key: 'AIzaSyD7Ytli5GUZu5S7FoaFn-sSMzsdWuwv_8E',
				q: searchItem
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

	handleClick = () => {
		if (!this.state.userInput) return;
		let searchTerm = this.state.userInput;
		this.findBooks(searchTerm);
		this.setState({
			userInput: ''
		});
	};

	handleClickAdd = (index) => {
		const dbRef = firebase.database().ref('readingList');
		const {title, authors, description, categories, averageRating, imageLinks} = this.state.books[index].volumeInfo;
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
		};

		for (let item in objectPush) {
			if (objectPush[item] === undefined) {
				delete objectPush[item];
			}
		}

		dbRef.once("value", (snapshot) => {
          	const data = snapshot.val();
			if (!data){
				dbRef.push(objectPush);
			} else {
				const retrievedArray = Object.values(data);
				retrievedArray.map((item) => {
					if (item.title === objectPush.title) {
						Swal.fire({  title: 'Oops...', imageUrl: "https://d827xgdhgqbnd.cloudfront.net/wp-content/uploads/2016/04/09121712/book-cover-placeholder.png", imageWidth: 400, imageHeight: 400, text: 'It looks like you have already added this book to your bookshelf!',  icon: 'error',  confirmButtonText: 'Cool'});
						return;
					} 
				})
				dbRef.push(objectPush);
			}			
        });

		this.setState({
			books: this.state.books.map((book, ind) => {
				if (ind !== index) return book;
				const addedBook = {...book};
				addedBook.isAdded = true;
				return addedBook;
			}),
		})
	};





	handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			if (!this.state.userInput) return;
			let searchTerm = this.state.userInput;
			this.findBooks(searchTerm);
			this.setState({
				userInput: ''
			});
		}
  };
  

	render() {
		if (this.state.hasError) {
			return <h1>There were no matches, please try again</h1>;
		}
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
				<button onClick={this.handleClick}>Search Book</button>
				<button onClick={this.handleClick}>{this.searchIcon}</button>
				{!this.state.books ? (
					<h1>There were no matches, please try again</h1>
				) : (
					<ul>
						{this.state.books.map((book, index) => {
							// if(book.volumeInfo.imageLinks === undefined){
							// book.volumeInfo.imageLinks = this.state.imageLinks;
							// }
							return (
							<li key={index}>
								<BookItem
									key={index}
									title={book.volumeInfo.title}
									authors={ book.volumeInfo.authors && book.volumeInfo.authors.length > 1 ? book.volumeInfo.authors.join(", ") : book.volumeInfo.authors }
									description={book.volumeInfo.description}
									genre={book.volumeInfo.categories}
									isAdded={book.isAdded}
									rating={book.volumeInfo.averageRating}
									thumbnail={ book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "https://d827xgdhgqbnd.cloudfront.net/wp-content/uploads/2016/04/09121712/book-cover-placeholder.png" }
									handleClickAdd={this.handleClickAdd}
								/>
								<button className={book.isAdded ? "toggledButton" : null} onClick={() => this.handleClickAdd(index)}>
								{ !book.isAdded ? "Add Book": "Added" }
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