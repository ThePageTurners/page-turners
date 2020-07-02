import React from 'react';
import { Link } from 'react-router-dom';
import bookIcon from '../assets/bookNavIcon.jpg';

function Navigation() {
	return (
		<nav className="navbar">
			<ul className="navbarNavigation">
				<li>
					<Link to="/search">Search Books</Link>
				</li>
				<li>
					<Link to="/bookshelf">My Bookshelf</Link>
				</li>
                <li>
					<a href="#">User Login</a>
				</li>
                <li className="bookIconImg">
                    <a href="">
                        <img src={bookIcon} alt="Book Icon"/>
                    </a>
                </li>
			</ul>
		</nav>
	);
}

// function NavItem() {

//     const [open, setOpen] = useState(false);

//     return(
//         <li className="navItem">
//             <a href="#" className="iconButton" onClick={() => setOpen(!open)}></a>
//         </li>
//     )

// }

export default Navigation;