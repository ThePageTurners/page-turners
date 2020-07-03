import React, { Component } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Ripples from 'react-ripples';
import './App.scss';

// * * * * ROUTER ELEMENTS
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Search from './components/Search';
import Bookshelf from './components/Bookshelf';
// * * * * ROUTER ELEMENTS END

class App extends Component {

	render() {
		return (
			<Router>
				<div className="App">
					<header>
						<Ripples className="h1" color="#f1f8f8" during={1200}>
							<Link to="/page-turners" className="pageTitle">
								<h1>Page Turners</h1>
							</Link>
						</Ripples>

						<Navigation />
					</header>

					<main>
						<div className="wrapper">
							<Route exact path="/page-turners" component={Home} />
							<Route exact path="/search" component={Search} />
							<Route exact path="/bookshelf" component={Bookshelf} />
						</div>
					</main>

					<Footer />
				</div>
			</Router>
		);
	}
}

export default App;
