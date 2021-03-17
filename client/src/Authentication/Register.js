import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Register.css';
import sockJS from 'sockjs-client';

class Register extends Component {
	handleRegistration = (e) => {
		e.preventDefault();
		let email = e.target.email.value;
		let password = e.target.password.value;
		let webSocket = new sockJS('http://localhost:4005/users');
		webSocket.onopen = () => {
			console.log('connected');
			const data = JSON.stringify({
				email: email,
				password: password,
				action: 'registerUser',
			});
			webSocket.send(data);
			webSocket.onmessage = (data) => {
				webSocket.close();
			};
		};
		this.props.history.push('/login');
	};
	render() {
		return (
			<div className='form-div'>
				<form onSubmit={this.handleRegistration} className='form'>
					<label>Email</label>
					<input type='email' id='email' />
					<label>Password</label>
					<input type='password' id='password' />
					<button type='submit' className='submit-button'>
						Register
					</button>
				</form>
			</div>
		);
	}
}

export default withRouter(Register);
