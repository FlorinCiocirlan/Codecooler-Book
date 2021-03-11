import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../images/logo.png';
import Form from '../Components/Form';
import Profile from '../Components/Profile';

export default class Navbar extends Component {
	render() {
		return (
			<Router>
				<header className='nav-header'>
					<div className='nav-logo-div'>
						<Link to='/'>
							<img src={logo} alt='image'></img>
						</Link>
					</div>
					<div className='nav-middle-div'>
						<Link to='/' id='nav-home-element' className='nav-elem'>
							Home
						</Link>
						<Link
							to='/about'
							className='nav-elem'
							id='nav-about-element'
						>
							About
						</Link>
					</div>
					<div className='nav-contact-div'>
						<Link
							to='/profile'
							id='contact-nav-elem'
							className='nav-elem'
						>
							Contact
						</Link>
					</div>
				</header>
				<Switch>
					<Route exact path='/'>
						<Form />
					</Route>
					<Route exact path='/about'>
						<Form />
					</Route>
					<Route exact path='/profile/:id'>
						<Profile />
					</Route>
				</Switch>
			</Router>
		);
	}
}
