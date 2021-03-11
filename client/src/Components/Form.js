import React, { Component } from 'react';
import './Form.css';
import { Redirect } from 'react-router-dom';

export default class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			file: null,
			redirect: null,
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}
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
					let json = JSON.parse(response);
					console.log(json.id);
					this.setState({ redirect: '/profile/' + json.id });
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
						<label for='first-name-field'>First Name: </label>
						<input
							placeholder='Enter your first name'
							required
							type='text'
							name='firstName'
							id='first-name-field'
						/>
					</div>
					<div className='form-pair-elements'>
						<label for='last-name-field'>Last Name: </label>
						<input
							placeholder='Enter your last name'
							required
							type='text'
							name='lastName'
							id='last-name-field'
						/>
					</div>
					<div className='form-pair-elements'>
						<label for='age-field'>Age</label>
						<input
							placeholder='Enter your age'
							requiredtype='text'
							name='age'
							id='age-field'
						/>
					</div>
					<div className='form-pair-elements'>
						<label for='country-field'>Country</label>
						<input
							placeholder='Enter your country'
							required
							type='text'
							name='country'
							id='country-field'
						/>
					</div>
					<div className='form-pair-elements'>
						<label for='city-field'>City</label>
						<input
							placeholder='Enter your city'
							required
							type='text'
							name='city'
							id='city-field'
						/>
					</div>
					<div className='file-input-div'>
						<input
							required
							type='file'
							name='profilePhoto'
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
