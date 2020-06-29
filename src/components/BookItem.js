import React from "react"
import bookPlaceHolder from "../assets/bookPlaceholder.png"

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

            { !props.imageLinks ?
			(<img src={bookPlaceHolder} alt={props.title} />)
			: 
			(<img src={props.thumbnail} alt={props.title} />)
			}
			<button onClick={()=>props.handleClickAdd(props.index)}>Add Book</button>
        </div>
    )
}

export default BookItem;