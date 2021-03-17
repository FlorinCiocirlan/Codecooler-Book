import React, { Component } from 'react';
import Profile from './Profile';
import ProfileForm from './ProfileForm';
import axios from 'axios';
import Loader from 'react-loader-spinner';

export default class Dashboard extends Component {
	state = {};

	componentDidUpdate = () => {
		axios
			.post('http://localhost:8080/user-service/get-user', {
				userId: this.props.user,
			})
			.then((res) => {
				this.setState({ userProfile: res.data });
				this.props.setUserProfile(res.data);
			});

		console.log('component did mount state is ' + this.state.userProfile);
		console.log('props.user in dashboard is  ' + this.props.user);
	};

	render() {
		// console.log(
		// 	'dashboard return console log of props is: ' +
		// 		this.props.userProfile
		// );
		console.log(this.state.userProfile + ' is in dashboard ');
		if (this.state.userProfile === 'null') {
			return (
				<ProfileForm
					setUserProfile={this.props.setUserProfile}
					userId={this.props.user}
				/>
			);
		} else if (this.state.userProfile != null) {
			return (
				<div>
					<Profile userProfile={this.state.userProfile} />
				</div>
			);
		}
		return (
			<Loader type='TailSpin' color='#00BFFF' height={80} width={80} />
		);
	}
}
