import React from "react";
import ReactReadMoreReadLess from "./ReadMore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as solidBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as outlineBookmark } from "@fortawesome/free-regular-svg-icons";

const BookItem = (props) => {
  let solidBookmarkIcon = (
    <FontAwesomeIcon icon={solidBookmark} size="3x" className="bookmark" />
  );
  let outlinedBookmarkIcon = (
    <FontAwesomeIcon icon={outlineBookmark} size="2x" />
  );

  return (
    <div className="book">
      <h3 className="title">{props.title}</h3>
        <div className="imageContainer bookImage">
          <img src={props.thumbnail} alt={props.title} />
        </div>
        <div className="writtenInfo info">
          {props.isAdded ? (
            <span className="bookmark">{solidBookmarkIcon}</span>
          ) : (
            <span className="bookmark">{outlinedBookmarkIcon}</span>
          )}
          <p className="author">{props.authors}</p>
          <p>Genre: {props.genre ? `${props.genre}` : "not available"}</p>
          <p>Rating: {props.rating ? `${props.rating}/5` : "not available"}</p>
        </div>
      {props.description ? (
        <div className="bookDescription blurb">
          <ReactReadMoreReadLess
            charLimit={200}
            readMoreText="read more ▼"
            readLessText="...read less ▲"
            readMoreClassName="read-more-less--more"
            readLessClassName="read-more-less--less"
          >
            {props.description}
          </ReactReadMoreReadLess>
        </div>

      ) : null}
    </div>
  );
};

export default BookItem;
