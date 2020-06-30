import React from "react";
import ReadMoreReact from 'read-more-react';

const BookItem = (props) => {

    let newDescription = props.description;
    if (!newDescription){newDescription = ''};

    return (
        <div>
            <h2>{props.title}</h2>
            { props.authors && props.authors.length > 1 ? (
            <p className="author">{props.authors.join(", ")}</p>
            ) :
            (<p className="author">{props.authors}</p>)}
            
            <p className="bookDescription">
                <ReadMoreReact text={newDescription}
                                min={100}
                                ideal={150}
                                max={1000}
                                readMoreText={<p>Read More</p>}
                                />
                                </p>

            <p>Genre: {props.genre}</p>
			<p>Rating: {props.rating}</p>
            <img src={props.thumbnail} alt={props.title} />
        </div>
    )
}

export default BookItem;
