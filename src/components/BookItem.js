import React from "react";

const BookItem = (props) => {

    return (
        <div>
            <h2>{props.title}</h2>
            { props.authors && props.authors.length > 1 ? (
            <p className="author">{props.authors.join(", ")}</p>
            ) :
            (<p className="author">{props.authors}</p>)}
            <p className="bookDescription">{props.description}</p>
            <p>Genre: {props.genre}</p>
			<p>Rating: {props.rating}</p>
            <img src={props.thumbnail} alt={props.title} />
        </div>
    )
}

export default BookItem;