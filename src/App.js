import React, { Component } from 'react';
import axios from 'axios';
import firebase from './firebase';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
    };
  }

// Google Books API_KEY: AIzaSyBHm9O2HGifn_tPk41f5AlovvUbZLKQO08


  render() {
    return (
      <div className="App">
        <h1>Books!</h1>
        <ul>
          {this.state.books.map((book) => {
            return <li>{book}</li>
          })}
      </ul>
      {/* <button onClick={() => this.deleteCharacter(character.id)}>Delete</button> */}
      </div>
    );
  }
}
export default App;