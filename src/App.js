import React, { Component } from 'react';
import firebase from './Firebase/index.js';
import Navigation from './components/Navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Favicon from 'react-favicon';
import ReactDOM from 'react-dom';
import './App.scss';
import Ripples from 'react-ripples';

// * * * * ROUTER ELEMENTS
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Search from './components/Search';
import Bookshelf from './components/Bookshelf';
// * * * * ROUTER ELEMENTS END

ReactDOM.render(
	<div>
		<Favicon url="favicon.ico" />
	</div>,
	document.getElementById('root')
);

class App extends Component {
	constructor() {
		super();
		this.state = {
			user: {},
			isLoggedIn: false,
			userNames: '',
			activeUser: ''
		};
	}

	github = <FontAwesomeIcon icon={faGithub} size="1x" />;

	componentDidMount() {
		const dbRef = firebase.database().ref();
		dbRef.once('value', (response) => {
			const data = response.val();
			const newState = Object.keys(data);
			console.log(data);
			console.log(newState);
			this.setState({
				userNames: newState
			});
		});
	}

	handleChangeUser = (event) => {
		this.setState({
			activeUser: event.target.value
		});
	};

	handleLogin = (event) => {
		if (this.state.activeUser !== '') {
			event.preventDefault();
			const userNames = this.state.userNames;
			const userName = this.state.activeUser;
			console.log(userName);
			const dbRef = firebase.database().ref(this.state.activeUser);
			console.log(dbRef);
			if (userNames.includes(userName)) {
				alert('Hello again!');
			} else {
				alert('Welcome, new user!');
				//creating an object in firebase with userName as a key
				dbRef.set([ 1, 2, 3 ]);
			}

			//removing login form from the UI
			this.setState({
				isLoggedIn: true
			});
		} else {
			alert('Please enter your name!');
		}
	};

	render() {
		return (
			<Router>
				<div className="App">
					<header>
						<Ripples className="h1" color="#f1f8f8" during={1200}>
							<Link to="/" className="pageTitle">
								<h1>Page Turners</h1>
							</Link>
						</Ripples>

						{/* LOGIN FORM */}
						{/* {this.state.isLoggedIn === false ? (
							<div>
								<form className="login">
									<input
										aria-label="username"
										type="text"
										placeholder="Username"
										value={this.state.activeUser}
										onChange={this.handleChangeUser}
										required
									/>
									<button type="submit" onClick={this.handleLogin}>
										Login
									</button>
								</form>
							</div>
						) : null} */}

						<Navigation />
					</header>

					<main>
						<div>
							{/* <Home /> */}
							<Route exact path="/" component={Home} />
							<Route exact path="/search" component={Search} />
							<Route exact path="/bookshelf" component={Bookshelf} />
						</div>
					</main>

					<footer>
						<div className="groupMembers">
							<h3>Group Project By:</h3>
							<ul>
								<li>
									<Ripples color="#f1f8f8" during={1200}>
										<a href="https://github.com/daibhidhdwaum">{this.github} @daibhidhdwaum</a>
									</Ripples>
								</li>
								<li>
									<Ripples color="#f1f8f8" during={1200}>
										<a href="https://github.com/vigyan-k">{this.github} @vigyan-k</a>
									</Ripples>
								</li>
								<li>
									<Ripples color="#f1f8f8" during={1200}>
										<a href="https://github.com/OksanaSam">{this.github} @OksanaSam</a>
									</Ripples>
								</li>
								<li>
									<Ripples color="#f1f8f8" during={1200}>
										<a href="https://github.com/amay-zingg">{this.github} @amay-zingg</a>
									</Ripples>
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
