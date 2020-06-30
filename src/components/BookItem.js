import React from "react";

const BookItem = (props) => {

    return (
        <div>
            <h2>{props.title}</h2>
            { props.authors && props.authors.length > 1 ? (
            <p className="author">{props.authors.join(", ")}</p>
            ) :
            (<p className="author">{props.authors}</p>)}
            { props.description ? (<p className="bookDescription">{props.description}</p>) : null }
            { props.genre ? (<p>Genre: {props.genre}</p>) : null }
			{ props.rating ? (<p>Rating: {props.rating}</p>) : null }
            <img src={props.thumbnail} alt={props.title} />
        </div>
    )
}

export default BookItem;