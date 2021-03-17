import React, { useState, useEffect, Component } from 'react';

import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';
import { FaArrowRight } from 'react-icons/fa';
import { TiHome } from 'react-icons/ti';
import { ImLocation } from 'react-icons/im';
import NoUser from '../images/no-user.png';
import Loader from 'react-loader-spinner';

export default class Profile extends Component {
	state = {};

	render() {
		if (!this.props.userProfile) {
			return (
				<Loader
					type='TailSpin'
					color='#00BFFF'
					height={80}
					width={80}
				/>
			);
		}

		let userProfile = JSON.parse(this.props.userProfile);
		return (
			<div className='container'>
				<div className='profile-container'>
					<div className='profile-image-container'>
						<img
							src={
								'https://codecooler.s3.eu-central-1.amazonaws.com/' +
								userProfile.profileImage
							}
							alt='no-user'
						/>
					</div>
					<div className='name-div'>
						<FaArrowRight />{' '}
						<span>
							{userProfile.firstName + ' ' + userProfile.lastName}
						</span>
					</div>
					<div className='age-div'>
						<FaArrowRight />{' '}
						<span>{'Age : ' + userProfile.age}</span>
					</div>
					<div className='country-div'>
						<ImLocation /> <span>{userProfile.country}</span>
					</div>
					<div className='city-div'>
						<TiHome /> <span>{userProfile.city}</span>
					</div>
				</div>
			</div>
		);
	}
}
