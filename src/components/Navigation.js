import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import bookStackIcon from '../assets/bookNavIcon.jpg';
import Ripples from 'react-ripples';
// * * * * GOT HELP FROM https://github.com/fireship-io/229-multi-level-dropdown

function Navigation() {
	return (
		<BookIcon>
			<DropdownMenu />
		</BookIcon>
	);
}

function BookIcon(props) {
	const [ open, setOpen ] = useState(false);

	return (
		<div className="bookDropdownLink">
			
			<a href="#" className="iconButton" onClick={() => setOpen(!open)}>
				<img src={bookStackIcon} alt="Book Icon made into a stack | https://icons8.com/" />
			</a>
			
			{open && props.children}
		</div>
	);
}

function DropdownMenu() {

	function DropdownItem(props) {
		return (
			<li>
				<Ripples className="nav" color="#f1f8f8" during={1200}>
					<Link to="/search" className="menuItem" >
						Search Books
					</Link>
				</Ripples>
			</li>
		);
	}
	function DropdownItem2(props) {
		return (
			<li>
				<Ripples className="nav" color="#f1f8f8" during={1200}>
					<Link to="/bookshelf" className="menuItem">
						My Bookshelf
					</Link>
				</Ripples>
			</li>
		);
	}
	return (
		<div className="dropdown">
			<DropdownItem />
			<DropdownItem2 />
		</div>
	);
}

export default Navigation;
