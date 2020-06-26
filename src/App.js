import React, { Component } from 'react';
import axios from 'axios';
import firebase from './firebase';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			books: []
		};
	}

	componentDidMount() {
		axios({
			url: `https://www.googleapis.com/books/v1/volumes?`,
			method: 'GET',
			responseType: 'JSON',
			params: {
				key: 'AIzaSyD7Ytli5GUZu5S7FoaFn-sSMzsdWuwv_8E',
				q: `intitle:life of pi`
			}
		}).then((response) => {
			console.log(response);
		});
	}

	render() {
		return (
			<div className="App">
				<h1>Books!</h1>
				<ul>
					{this.state.books.map((book) => {
						return <li>{book}</li>;
					})}
				</ul>
				{/* <button onClick={() => this.deleteCharacter(character.id)}>Delete</button> */}
			</div>
		);
	}
}
export default App;
