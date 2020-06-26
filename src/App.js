import React, { Component } from 'react';
import axios from 'axios';
// import firebase from './firebase';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			books: [],
		};
	}

	componentDidMount() {
		axios({
			url: `https://www.googleapis.com/books/v1/volumes?`,
			method: 'GET',
			responseType: 'JSON',
			params: {
				key: 'AIzaSyD7Ytli5GUZu5S7FoaFn-sSMzsdWuwv_8E',
				q: `neil gaiman`
			}
		}).then((response) => {
			let books = response.data.items;
			console.log(response.data.items)
			
			this.setState({
				books,
			})			
		});
	}
	// Yay I think I figured it out :D **** -Vigyan

	render() {
		return (
			<div className="App">
				<h1>Books!</h1>
				<ul>
					{this.state.books.map((book,index) => {
						let authorName = book.volumeInfo.authors;
						let authorNameAsString = authorName.join(', ');
						return (
							<div key={index}>
								<li>
									<p>{book.volumeInfo.title}</p>
									<p>{authorNameAsString}</p>
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
