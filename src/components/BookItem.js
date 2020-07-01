import React from "react";
// import ReadMoreReact from 'read-more-react';
import ReactReadMoreReadLess from 'react-read-more-less';

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
        { props.description ? 
            (<div className="bookDescription blurb">
              {/* <ReadMoreReact
                    text={props.description}
                    min={100}
                    ideal={150}
                    max={1000}
                    readMoreText={<p>Read More</p>}
                />  </div>) : null } */}
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