import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../images/logo.png';
import Form from './ProfileForm';
import Profile from '../Components/Profile';
import { ReactSession } from 'react-client-session';

export default class Navbar extends Component {
	handleLogout = () => {
		localStorage.clear();
		this.props.setUser(null);
	};
	render() {
		return (
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
				{this.props.user != null ? (
					<div className='nav-contact-div'>
						<Link
							to='/login'
							id='contact-nav-elem'
							className='nav-elem'
							onClick={this.handleLogout}
						>
							Logout
						</Link>
					</div>
				) : (
					<div className='nav-contact-div'>
						<Link
							to='/register'
							id='contact-nav-elem'
							className='nav-elem'
						>
							Register
						</Link>
						<Link
							to='/login'
							id='contact-nav-elem'
							className='nav-elem'
							onClick={this.logout}
						>
							Login
						</Link>
					</div>
				)}
			</header>
		);
	}
}
