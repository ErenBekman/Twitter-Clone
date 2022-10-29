const socektio = require('socket.io');
const express = require('express');
const http = require('http');
const app = express();

const server = http.createServer(app);

const io = socektio(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST', 'OPTIONS'],
	},
});

let users = [];

const addUser = (userId, socketId) => {
	!users.some((user) => user.userId === userId) &&
		users.push({ userId, socketId });
};

const removeUser = (socketId) => {
	users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
	return users.find((user) => user.userId === userId);
};

server.listen(8900, () => {
	io.on('connection', (socket) => {
		console.log('a user connected.');

		socket.on('addUser', (userId) => {
			console.log('userId :>> ', userId);
			addUser(userId, socket.id);
			io.emit('getUsers', users);
			console.log('users :>> ', users);
		});

		socket.on('sendMessage', ({ sender, receiverId, text }) => {
			const user = getUser(receiverId);
			console.log('user :>> ', user);

			io.to(user.socketId).emit('getMessage', {
				sender,
				text,
			});
			// socket.broadcast.emit('getMessage', {
			// 	sender,
			// 	text,
			// });
		});

		socket.on('typing', (username) => {
			console.log('socket.username :>> ', username);
			socket.broadcast.emit('typing', {
				username: username,
			});
		});

		socket.on('stopTyping', (username) => {
			socket.broadcast.emit('stopTyping', {
				username: username,
			});
		});

		socket.on('sendNotification', ({ senderName, receiverId, type }) => {
			const receiver = getUser(receiverId);
			console.log('receiver :>> ', receiver);
			console.log('senderName :>> ', senderName);
			console.log('receiverId :>> ', receiverId);
			console.log('type :>> ', type);

			socket.broadcast.emit('getNotification', {
				senderName,
				type,
			});

			// io.to(receiver.socketId).emit('getNotification', {
			// 	senderName,
			// 	type,
			// });
		});

		socket.on('disconnect', () => {
			console.log('a user disconnected!');
			removeUser(socket.id);
			io.emit('getUsers', users);
		});
	});
});
