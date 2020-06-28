import React from 'react'
import bookPlaceHolder from '../assets/bookPlaceholder.png'

const BookItem = (props) => {
    return (
        <div>
            <h2>{props.title}</h2>
            { props.authors.length > 1 ? (
            <p className="author">{props.authors.join(', ')}</p>
            ) :
            (<p className="author">{props.authors}</p>)}
            {/* <p>{authorNameAsString}</p> */}
            {/* <p>{book.volumeInfo.authors}</p> */}
            <p className='bookDescription'>{props.description}</p>
            {
            !props.imageLinks
            ?
			(<img src={bookPlaceHolder} alt={props.title} />)
			:
			(<img src={props.thumbnail} alt={props.title} />)
			}
            <button>Add Book</button>
        </div>
    )
}

export default BookItem;