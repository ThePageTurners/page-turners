import React, { useState } from "react";
import { Link } from "react-router-dom";
import bookStackIcon from "../assets/bookNavIcon.jpg";

function Navigation() {
	const [ open, setOpen ] = useState(false);

	function navToggle() {
		setOpen(wasOpened => !wasOpened)
	}
	
	return (
      <div className="bookDropdownLink">
        <div className="bookIconImg" onClick={navToggle}>
          <a href="#" className="iconButton">
            <img
              src={bookStackIcon}
              alt="Book Icon made into a stack | https://icons8.com/"
            />
          </a>
        </div>
        {open && (
          <ul className="dropdown">
            <li>
              <Link to="/search" className="menuItem" onClick={navToggle}>
                Search Books
              </Link>
            </li>
            <li>
              <Link to="/bookshelf" className="menuItem" onClick={navToggle}>
                My Bookshelf
              </Link>
            </li>
          </ul>
        )}
      </div>
  );
}

export default Navigation;
