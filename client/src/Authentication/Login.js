import React, { Component } from 'react';
import sockJS from 'sockjs-client';
import { Redirect } from 'react-router-dom';

class Login extends Component {
	state = {};
	handleSubmit = (e) => {
		e.preventDefault();
		let email = e.target.email.value;
		let password = e.target.password.value;

		const webSocket = new sockJS('http://localhost:4005/users');
		webSocket.onopen = () => {
			const data = JSON.stringify({
				email: email,
				password: password,
				action: 'loginUser',
			});
			webSocket.send(data);
			webSocket.onmessage = (data) => {
				if (data.data === 'Invalid credentials !') {
					console.log('Invalid credentials');
				} else {
					// let user = JSON.parse(data);
					let user = JSON.parse(data.data);
					localStorage.setItem('userId', user._id);
					console.log(localStorage.getItem('userId'));
					// this.props.getCredentials(data.data);
					this.setState({ isLoggedIn: true });
					this.props.setUser(user._id);
					console.log('Succesfully logged in');
				}
			};
		};
	};

	render() {
		if (this.state.isLoggedIn) {
			return <Redirect to={'/dashboard'} />;
		}
		return (
			<div className='form-div'>
				<form className='form' onSubmit={this.handleSubmit}>
					<label>Email</label>
					<input type='email' id='email' />
					<label>Password</label>
					<input type='password' id='password' />
					<button type='submit' className='submit-button'>
						Login
					</button>
				</form>
			</div>
		);
	}
}

export default Login;
