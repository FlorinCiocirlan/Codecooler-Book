import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';
import { FaArrowRight } from 'react-icons/fa';
import { AiOutlineHome } from 'react-icons/ai';
import { ImLocation } from 'react-icons/im';
import NoUser from '../images/no-user.png';

export default function Profile() {
	const [user, setUser] = useState();
	const [fetched, setFetched] = useState(false);
	const [firstName, setFirstName] = useState('loading');
	const [lastName, setLastName] = useState('');
	const [age, setAge] = useState('loading');
	const [country, setCountry] = useState('loading');
	const [city, setCity] = useState('loading');
	const { id } = useParams();

	axios
		.post('http://localhost:8080/user-service/user', {
			id: id,
		})
		.then((res) => {
			setUser(JSON.parse(res.data));
			setFetched(true);
		});

	useEffect(() => {
		if (user != undefined) {
			setFirstName(user['firstName']);
			setLastName(user['lastName']);
			setAge(user['age']);
			setCity(user['city']);
			setCountry(user['country']);
		}
	}, [user]);

	return (
		<div className='container'>
			<div className='profile-container'>
				<div className='profile-image-container'>
					<img src={NoUser} alt='no-user' />
				</div>
				<div className='name-div'>
					<FaArrowRight /> <span>{firstName + ' ' + lastName}</span>
				</div>
				<div className='age-div'>
					<FaArrowRight /> <span>{'Age : ' + age}</span>
				</div>
				<div className='country-div'>
					<ImLocation /> <span>{country}</span>
				</div>
				<div className='city-div'>
					<AiOutlineHome /> <span>{city}</span>
				</div>
			</div>
		</div>
	);
}
