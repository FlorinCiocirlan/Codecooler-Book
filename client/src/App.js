import Navbar from './Components/Navbar';
import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import './App.css';
import Register from './Authentication/Register';
import Login from './Authentication/Login';
import Home from './Components/Home';
import Dashboard from './Components/Dashboard';
import ProfileForm from './Components/ProfileForm';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ReactSession } from 'react-client-session';

class App extends Component {
	state = {};

	// componentDidMount = () => {
	// 	console.log(localStorage.getItem('userId'));
	// 	// this.setUser(localStorage.getItem('userId'));
	// 	axios
	// 		.post('http://localhost:8080/user-service/get-user', {
	// 			userId: this.state.user,
	// 		})
	// 		.then((response) => {
	// 			console.log('app fetch user response is ' + response);
	// 			this.setUserProfile(response.data);
	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 		});
	// };

	setUser = (user) => {
		this.setState({
			user: user,
		});
	};

	setUserProfile = (userProfile) => {
		this.setState({ userProfile: userProfile });
	};

	render() {
		{
			console.log(this.state.user);
		}
		return (
			<BrowserRouter>
				<div className='App'>
					<Navbar user={this.state.user} setUser={this.setUser} />
					<Switch>
						<Route exact path='/' component={Home} />
						<Route
							exact
							path='/register'
							render={() => <Register />}
						/>
						<Route
							exact
							path='/login'
							render={() => <Login setUser={this.setUser} />}
						/>
						<Route
							exact
							path='/dashboard'
							render={() => (
								<Dashboard
									user={this.state.user}
									setUserProfile={this.setUserProfile}
								/>
							)}
						/>
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
