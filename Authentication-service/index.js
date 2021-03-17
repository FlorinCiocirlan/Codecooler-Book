const http = require('http');
const sockjs = require('sockjs');
const monk = require('monk');
const url = 'mongodb:27017/codecooler';
const db = monk(url);
const md5 = require('md5');
db.then(() => {
	console.log('Connected to mongodb ');
});

var socket = sockjs.createServer({
	sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js',
});
socket.on('connection', function (conn) {
	conn.on('data', (data) => {
		let message = JSON.parse(data);
		if (message.action === 'registerUser') {
			registerUser(message, conn);
		} else if (message.action === 'loginUser') {
			loginUser(message, conn);
		}
	});
	conn.on('close', () => {
		console.log('connection closed');
	});
});

var server = http.createServer();
socket.installHandlers(server, { prefix: '/users' });
server.listen(4000, '0.0.0.0');

// Function which persists user to the database;

const registerUser = (data, conn) => {
	const encryptedPassword = md5(data.password);
	const usersDB = db.get('users');
	usersDB.insert({ email: data.email, password: encryptedPassword });
	usersDB.findOne({ email: data.email }).then((res) => {
		conn.write(JSON.stringify(res));
	});
};

// Function which checks if user exists in db

const loginUser = (data, conn) => {
	const usersDB = db.get('users');
	// console.log(data);
	const encryptedPassword = md5(data.password);
	usersDB
		.findOne({ email: data.email, password: encryptedPassword })
		.then((res) => {
			if (res) {
				console.log('user matched');
				conn.write(JSON.stringify(res));
			} else {
				console.log('user didn"t match');
				conn.write('Invalid credentials !');
			}
		});
};

// const monk = require('monk');

// const url = 'mongodb:27017/codecooler';

// const db = monk(url);

// db.then(() => {
// 	console.log('Connected correctly to server');
// });

// const users = db.get('users');

// users
// 	.insert([{ name: 'Florin' }, { name: 'Iza' }, { name: 'Pachi' }])
// 	.then((docs) => {
// 		// console.log(docs);
// 	})
// 	.catch((err) => {
// 		// An error happened while inserting
// 	});

// console.log(users.find());
