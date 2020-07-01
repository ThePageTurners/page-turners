import React from "react";
// import ReadMoreReact from 'read-more-react';

const BookItem = (props) => {

  return (
    <div className="book">
      <h2 className="header">{props.title}</h2>
      <div className="bookInfo info">
        <div className="imageContainer">
          <img src={props.thumbnail} alt={props.title} />
        </div>
        <div className="writtenInfo">
          {props.authors && props.authors.length > 1 ? (
            <p className="author">{props.authors.join(", ")}</p>
          ) : (
            <p className="author">{props.authors}</p>
          )}
          <p>Genre: {props.genre}</p>
          <p>Rating: {props.rating}/5</p>

        </div>
      <p className="bookDescription blurb">{props.description}</p>
      </div>
    </div>
  );
};

export default BookItem;
