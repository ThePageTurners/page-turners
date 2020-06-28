import React, { Component } from 'react';
import axios from 'axios';
import './App.scss';
import firebase from './Firebase/index.js';
import bookPlaceHolder from './assets/bookPlaceholder.png'
// import BookItem from './components/BookItem.js'

class App extends Component {
	constructor() {
		super();
		this.state = {
			books: [],
			userInput: '',
			bookShelf: []
		};
	}

	componentDidMount() {
		// For retrieval of bookshelf list***
		const dbRef = firebase.database().ref('readingList');
		dbRef.on('value', (snapshot) => {
			const readingList = [];
			const data = snapshot.val();

			for (let key in data) {
				readingList.push({
					id: key,
					bookList: data[key]
				});
			}
			this.setState({
				bookShelf: readingList
			});
			console.log(this.state.bookShelf)
		});
	}

	findBooks = (searchItem) => {
		axios({
			url: `https://www.googleapis.com/books/v1/volumes?`,
			method: 'GET',
			responseType: 'JSON',
			params: {
				key: 'AIzaSyD7Ytli5GUZu5S7FoaFn-sSMzsdWuwv_8E',
				q: searchItem
			}
		}).then((response) => {
			let books = response.data.items;
			this.setState({
				books
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
		})
	};

	handleClickAdd = (index) => {
		const dbRef = firebase.database().ref('readingList');
		const objectPush = {
			title: this.state.books[index].volumeInfo.title,
			author: this.state.books[index].volumeInfo.authors,
		}
		dbRef.push(objectPush)
	}
	
	handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			if (!this.state.userInput) return;
			let searchTerm = this.state.userInput;
			this.findBooks(searchTerm);
			this.setState({
				userInput: ''
			})
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
						// let authorName = book.volumeInfo.authors;
						// let authorNameAsString = authorName.join(', ');
						// <p>{authorNameAsString}</p>
						return (
								<div key={index}>
								<li>
									<p>{book.volumeInfo.title}</p>
									<p>{book.volumeInfo.authors}</p>
									<p>{book.volumeInfo.description}</p>
									<p>Genre: {book.volumeInfo.categories}</p>
									<p>Rating: {book.volumeInfo.averageRating}</p>
									{
									book.volumeInfo.imageLinks === undefined ?
									 (<img src={bookPlaceHolder} alt={book.volumeInfo.title} />)
									 : 
									(<img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />)
									}
									<button onClick={()=>this.handleClickAdd(index)}>Add Book</button>
									{/* <image src={
											book.volumeInfo.imageLinks === undefined
											  ? {bookPlaceHolder}
											  : `${book.volumeInfo.imageLinks.thumbnail}`
									}/> */}
								</li>
								
								{/* <li>
                                    <BookItem
                                        key={index}
                                        title={book.volumeInfo.title}
                                        authors={book.volumeInfo.authors}
                                        description={book.volumeInfo.description}
										thumbnail={book.volumeInfo.imageLinks.thumbnail}
										imageLinks={book.volumeInfo.imageLinks}
                                    />
                                </li> */}
							</div>
						);
					})}
				</ul>
				{/* <button onClick={() => this.deleteCharacter(character.id)}>Delete</button> */}
			</div>
		);
	}
}
export default App;
