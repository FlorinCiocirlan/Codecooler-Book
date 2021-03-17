import React from 'react';
import sockJS from 'sockjs-client';

export default function Connection() {
	const webSocket = new sockJS('http://localhost:4005/users');

	webSocket.onopen = () => {
		console.log('connection opened');
	};
	return webSocket;
}
