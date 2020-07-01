import React, { Component } from 'react';

// * * * * ROUTER ELEMENTS
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Search from './components/Search';
import Bookshelf from './components/Bookshelf';
// * * * * ROUTER ELEMENTS END

import githubLogo from './assets/github.svg';
import './App.scss';

class App extends Component {
	constructor() {
		super();
		this.state = {
			user: {},
			isLoggedIn: false,
      		userNames: "",
      		activeUser: "",
		};
	  }


	  componentDidMount() {
		const dbRef = firebase.database().ref();
		dbRef.once('value', (response) => {
			const data = response.val();
      		const newState = Object.keys(data);
      		console.log(data);
      		console.log(newState);
			this.setState({
				userNames: newState
			})
		})
	  }

	  handleChangeUser = (event) => {
		this.setState({
		  activeUser: event.target.value
		});
	  };


	  handleLogin = (event) => {
		if (this.state.activeUser !== "") {
		  event.preventDefault();
		  const userNames = this.state.userNames;
		  const userName = this.state.activeUser;
		  console.log(userName);
		  const dbRef = firebase.database().ref(this.state.activeUser);
		  console.log(dbRef);
			if (userNames.includes(userName)) {
				alert("Hello again!")
			} else {
				alert("Welcome, new user!")
				//creating an object in firebase with userName as a key
				dbRef.set([1, 2, 3])
			}
	
		  //removing login form from the UI
		  this.setState({
			isLoggedIn: true
		  })
		} else {
		  alert("Please enter your name!")
		};
	  };


	render() {
		return (
			<Router>
				<div className="App">
					<header>
						{/* LOGIN FORM */}
						{ (this.state.isLoggedIn === false) ? 
						(<div>
							<form className = "login">
								<input aria-label="username" type="text" placeholder="Username" value={this.state.activeUser} onChange={this.handleChangeUser} required/>
								<button type="submit" onClick={this.handleLogin}>Login</button>
							</form>
						</div>) : null }

						<h1>Page Turners</h1>

						<nav className="headerNav">
							<ul>
								<li>
									<Link to="/">Home</Link>
								</li>
								<li>
									<Link to="/search">Search Books</Link>
								</li>
								<li>
									<Link to="/bookshelf">My Bookshelf</Link>
								</li>
							</ul>
						</nav>
					</header>


          <main>
            <div>
              	<Route exact path="/" component={Home} />
              	<Route exact path="/search" component={Search} />
				<Route exact path="/bookshelf" component={Bookshelf} />
            </div>

						{/* <div className="pageReturnAside">
              <h3>I AM A TITLE</h3>
              <p>Hello</p>
            </div> */}
					</main>

					<footer>
						<div className="groupMembers">
							<h3>Group Project By:</h3>
							<ul>
								<li>
									<img src={githubLogo} alt="Github Logo" />
									<a href="https://github.com/daibhidhdwaum">@daibhidhdwaum</a>
								</li>
								<li>
									<img src={githubLogo} alt="Github Logo" />
									<a href="https://github.com/vigyan-k">@vigyan-k</a>
								</li>
								<li>
									<img src={githubLogo} alt="Github Logo" />
									<a href="https://github.com/OksanaSam">@OksanaSam</a>
								</li>
								<li>
									<img src={githubLogo} alt="Github Logo" />
									<a href="https://github.com/amay-zingg">@amay-zingg</a>
								</li>
							</ul>
						</div>
					</footer>
				</div>
			</Router>
		);
	}
}

export default App;
