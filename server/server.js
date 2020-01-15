const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

	// Import Controllers --------------------------------
const userController = require('./controllers/userController');
const dataController = require('./controllers/dataController');
// const cookieController = require('./controllers/cookieController');
// const sessionController = require('./controllers/sessionController');

	// Server Setup --------------------------------------
const port = 3000;
const app = express();

	// Connect to DB --------------------------------------
const { MONGO_URI } = require('../config');
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;


	// File Handling --------------------------------------
app.use('/build', express.static(path.join(__dirname, '../build')));

app.use(bodyParser());
app.use(cookieParser());

	// Routes ---------------------------------------------
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/getData', (req, res) => {

});

app.post('/signUp', 					// pass down onSubmit function instead of form method
	userController.bcryptify,
	userController.createUser,
	dataController.createUserData,
	// cookieController.setSSIDCookie,
	// sessionController.startSession,
	dataController.fetchUserData,
	(req, res) => {
		res.status(200).json({ userData: res.locals.userData });
});

app.post('/login',						// pass down onSubmit function instead of form method
	userController.bcryptify,
	userController.verifyUser,
	// sessionController.isLoggedIn,
	// sessionController.startSession,
	dataController.fetchUserData,
	(req, res) => {
		res.status(200).json({ userData: res.locals.userData });
});

app.post('/updatePeople',
	dataController.fetchUserData,
	dataController.updatePeople,
	(req, res) => {
		res.status(200).json({ userData: res.locals.userData });
});

app.post('/hint',
	dataController.fetchUserData,
	dataController.addHint,
	(req, res) => {
		res.sendStatus(200);
});

	// Error Handling -------------------------------------
app.use('*', (req, res) => {
	res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
	console.log(err);
	res.status(500).send('Internal Server Error');
});

	// Start Server ---------------------------------------
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});