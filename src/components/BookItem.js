import React from "react";
// import ReadMoreReact from 'read-more-react';
import ReactReadMoreReadLess from 'react-read-more-less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as outlineBookmark } from '@fortawesome/free-regular-svg-icons';

const BookItem = (props) => {

  let solidBookmarkIcon = <FontAwesomeIcon icon={solidBookmark} size="2x"/>;
  let outlinedBookmarkIcon = <FontAwesomeIcon icon={outlineBookmark} size="2x"/>;

  return (
    <div className="book">
      <h2 className="header">{props.title}</h2>
      <div className="bookInfo info">
        <div className="imageContainer">
          <img src={props.thumbnail} alt={props.title} />
        </div>
        <div className="writtenInfo">
          { props.isAdded ? (<span>{solidBookmarkIcon}</span>) : (<span>{outlinedBookmarkIcon}</span>) } 
          <p className="author">{props.authors}</p>
          <p>Genre: { props.genre ? `${props.genre}` : "not available" }</p>
          <p>Rating: { props.rating ? `${props.rating}/5` : "not available" }</p>
        </div>
        { props.description ? 
            (<div className="bookDescription blurb">
            <ReactReadMoreReadLess
                charLimit={200}
                readMoreText={<p>Read more ▼</p>}
                readLessText={<p>Read less ▲</p>}
                readMoreClassName="read-more-less--more"
                readLessClassName="read-more-less--less"
            >
                {props.description}
            </ReactReadMoreReadLess> 
             </div>) : null }
      </div>
    </div>
  );
};

export default BookItem;