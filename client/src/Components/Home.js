import React, { Component } from 'react';
import { ReactSession } from 'react-client-session';
import axios from 'axios';

export default class Home extends Component {
	render() {
		return (
			<div>
				I am user with id : {ReactSession.get('userId')}
				<div>This content is from home page</div>
			</div>
		);
	}
}
