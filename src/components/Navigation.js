import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

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
			<a href="#" className="iconButton" onClick={() => setOpen(!open)} />
			{open && props.children}
		</div>
	);
}

function DropdownMenu() {
	const [ activeMenu, setActiveMenu ] = useState('main');

	function DropdownItem(props) {
		return (
			<li>
				<Link to="/search" className="menuItem">
					Search Books
				</Link>
			</li>
		);
	}
	function DropdownItem2(props) {
		return (
			<li>
				<Link to="/bookshelf" className="menuItem">
					My Bookshelf
				</Link>
			</li>
		);
	}
	function DropdownItem3(props) {
		return (
			<li>
				<a href="#" className="menuItem" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
					User Login
				</a>
			</li>
		);
	}
	function DropdownItem4(props) {
		return (
			<div className="menu">
				{/* <img src={Left} alt="Left Arrow" /> */}
				<li>
					<a href="/main">Hello</a>
				</li>
			</div>
		);
	}
	return (
		<div className="dropdown">
			<CSSTransition in={activeMenu === 'main'} unmountOnExit timeout={500} classNames="menuPrimary">
				<div className="menu">
					<DropdownItem />
					<DropdownItem2 />
				</div>
			</CSSTransition>

			<CSSTransition in={activeMenu === 'userLogin'} unmountOnExit timeout={500} classNames="menuSecondary">
				<DropdownItem4 goToMenu="main" />
			</CSSTransition>
		</div>
	);
}

export default Navigation;
