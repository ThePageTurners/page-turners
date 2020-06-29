import React, { Component } from "react";
import firebase from "../Firebase/index.js";

class Bookshelf extends Component {
    constructor() {
      super();
      this.state = {
        readingList: [
            {
                title: "Harry Potter",
                author: "J.K. Rowling",
                isRead: false,
            },
            {
                title: "1984",
                author: "George Orwell",
                isRead: false,
            }
        ],
      };
    }


    // componentDidMount() {
    //     // Retrieving bookshelf items
    //     const dbRef = firebase.database().ref("readingList");
    //     dbRef.on("value", (snapshot) => {
    //     //   const readingList = [];
    //       const data = snapshot.val();
    //       this.setState({
    //         readingList: data,
    //       });
    //       console.log(this.state.readingList);
    //     });
    //   }
    

    
    toggleRead = (index) => {
        this.state.readingList[index].isRead = true;
        console.log(this.state.readingList[index].isRead);
    }


    render() {
        return (
            <div>
                <h2>Bookshelf</h2>
                <ul>
                    {this.state.readingList.map((book, index) => {
                        return(
                    <li key={index}>
                        <p>{book.title}</p>
                        <p>{book.author}</p>
                        <button onClick={() => this.toggleRead(index)}>Mark as Read</button>
                    </li>
                    );
                 })}
                </ul>

                
            </div>
        )
    }
}

export default Bookshelf;