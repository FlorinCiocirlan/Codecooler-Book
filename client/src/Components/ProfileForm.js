import React, { Component } from 'react';
import './ProfileForm.css';
import { Redirect } from 'react-router-dom';

export default class ProfileForm extends Component {
	state = {
		file: null,
		redirect: null,
	};

	onSubmit = (event) => {
		event.preventDefault();
		const form = event.target;
		const data = new FormData(form);

		for (let name of data.keys()) {
			if (name === 'profilePhoto') {
				data.set(name, this.state.file);
			} else {
				const input = form.elements[name].value;
				data.set(name, input);
			}
		}

		// Adding UserID to form

		console.log(this.props.userId);
		// data.append('userId', this.props.userId);

		function handleError(err) {
			console.log(err);
		}

		fetch('http://localhost:8080/user-service/create', {
			method: 'POST',
			body: data,
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Error code ' + response.status);
				}
				let submitButton = document.querySelector('#submit-button');
				submitButton.disabled = true;

				response.json().then((response) => {
					let jsonResponse = JSON.parse(response);
					this.props.setUserProfile(jsonResponse);
					this.state.redirect = '/dashboard';
				});
			})
			.catch((err) => {
				handleError(err);
			});

		// fetch('http://0.0.0.0:8080/user-service/users', {
		// 	method: 'GET',
		// }).then((response) => {
		// 	console.log(response);
		// });
	};

	onChange = (event) => {
		// console.log(event.target.files[0]);
		this.setState({ file: event.target.files[0] });
		document.querySelector('.file-input-info').innerText =
			event.target.files[0].name;
	};

	render() {
		if (this.state.redirect) {
			return <Redirect to={this.state.redirect} />;
		}
		return (
			<div className='form-div'>
				<form onSubmit={this.onSubmit} className='form'>
					<div className='form-pair-elements'>
						<label>First Name: </label>
						<input
							placeholder='Enter your first name'
							required
							type='text'
							name='firstName'
							id='first-name-field'
						/>
					</div>
					<div className='form-pair-elements'>
						<label>Last Name: </label>
						<input
							placeholder='Enter your last name'
							required
							type='text'
							name='lastName'
							id='last-name-field'
						/>
					</div>
					<div className='form-pair-elements'>
						<label>Age</label>
						<input
							placeholder='Enter your age'
							requiredtype='text'
							name='age'
							id='age-field'
						/>
					</div>
					<div className='form-pair-elements'>
						<label>Country</label>
						<input
							placeholder='Enter your country'
							required
							type='text'
							name='country'
							id='country-field'
						/>
					</div>
					<div className='form-pair-elements'>
						<label>City</label>
						<input
							placeholder='Enter your city'
							required
							type='text'
							name='city'
							id='city-field'
						/>
					</div>
					<input hidden name='userId' value={this.props.userId} />
					<div className='file-input-div'>
						<input
							required
							type='file'
							name='profilePhoto'
							onClick={() => {
								console.log('helloo');
							}}
							onChange={this.onChange}
							className='form-file-input'
							id='file-input'
							hidden
						/>
						<label className='file-input-label' for='file-input'>
							Choose file
						</label>
						<p className='file-input-info'>No file chosen</p>
					</div>
					<div className='submit-button-div'>
						<input
							type='submit'
							value='Submit'
							id='submit-button'
						/>
					</div>
				</form>
			</div>
		);
	}
}
