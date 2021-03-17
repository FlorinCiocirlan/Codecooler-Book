import React from 'react';
import { ReactSession } from 'react-client-session';

export default function Logout() {
	ReactSession.set('userId', '');
	return null;
}
