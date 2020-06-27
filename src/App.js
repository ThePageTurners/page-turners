import React, { Component } from 'react';
import axios from 'axios';
// import firebase from './firebase';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			books: [],
			userInput: '',
		};
	}

	// componentDidMount() {

		findBooks = (searchItem) => {
			axios({
				url: `https://www.googleapis.com/books/v1/volumes?`,
				method: 'GET',
				responseType: 'JSON',
				params: {
					key: 'AIzaSyD7Ytli5GUZu5S7FoaFn-sSMzsdWuwv_8E',
					q: searchItem,
				}
			}).then((response) => {
				let books = response.data.items;
				console.log(response.data.items)
				this.setState({
					books,
				})			
			});
		}
	// }

	handleChange = (event) => {
		this.setState({
		  userInput: event.target.value
		});
	}


	handleClick = () => {
		if (!this.state.userInput) return;
		let searchTerm = this.state.userInput;
		this.findBooks(searchTerm);
		this.state.userInput = '';
    };

	handleKeyPress = (e) => {
        if (e.key === 'Enter') {
			if (!this.state.userInput) return;
			let searchTerm = this.state.userInput;
			this.findBooks(searchTerm);
			this.state.userInput = '';
        }
    };

	render() {
		return (
			<div className="App">
				<input
					type="text"
					value={this.state.userInput}
					onChange={this.handleChange}
					onKeyPress={this.handleKeyPress}
					name="userInput"
					isFocused
				/>
				<button onClick={this.handleClick}>Search Book</button>
           
				<h1>Books!</h1>
				<ul>
					{this.state.books.map((book,index) => {
						// let authorName = book.volumeInfo.authors;
						// let authorNameAsString = authorName.join(', ');
						return (
							<div key={index}>
								<li>
									<p>{book.volumeInfo.title}</p>
									{/* <p>{authorNameAsString}</p> */}
									<p>{book.volumeInfo.authors}</p>
									<p>{book.volumeInfo.description}</p>
									<img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title}/>
					
								</li>
								
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
