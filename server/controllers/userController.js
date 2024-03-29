const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const userController = {};


	// Convert password to Bcrypt --------------------------
userController.bcryptify = (req, res, next) => {
	bcrypt.hash(req.body.password, 10, function (err, hash) {
		if (err) { 
			console.log(`Error in bcryptify: ${err}`);
			return next(err);
		} else {
			res.locals.userInfo = {
				name: req.body.name,
				email: req.body.email,
				password: hash,
			}
			return next();
		}
	});
}

	// Add user to database --------------------------------
userController.createUser = (req, res, next) => {
	const { name, email, password } = res.locals.userInfo;
	console.log(`name: ${name}, email: ${email}, password: ${password}`);
	User.create({ email, password }, function (err, data) {
		if (err) {
			console.log(`Error in createUser: ${err}`);
			return next(err);
		} else {
			res.locals._id = data._id;
			return next();
		}
	});
}

	// Verify login credentials ---------------------------
userController.verifyUser = (req, res, next) => {
	const { email, password} = req.body;
	User.findOne({ email }, function (err, data) {
		if (err) {
			console.log(`Error in verifyUser: ${err}`);
			return next(err);
		} else if (data === null) {
			console.log('Error in verifyUser: User not found');
			return next();	// rerender login screen with error message
		} else {
			bcrypt.compare(password, data.password, function (err, compareResults) {
				if (err) {
					console.log(`Error in verifyUser.compare: ${err}`);
					return next(err);
				} else if (!compareResults) {
					console.log(`No compareResults in verifyUser!!!`);
					res.next('ERROR');
				} else {
					res.locals._id = data._id;
					return next();
				}
			});
		}
	});
}

module.exports = userController;