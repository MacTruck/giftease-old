const Data = require('../models/dataModel');

const dataController = {}

	// Create new user data object ------------------------
dataController.createUserData = (req, res, next) => {
	const user = {
		userId: res.locals._id,
		email: res.locals.userInfo.email,
		name: res.locals.userInfo.name,
	};
	Data.create(user, function (err, data) {
		if (err) {
			console.log(`Error in dataController.createUserData ${err}`);
			return next(err);
		} else {
			return next();
		}
	});
}

	// Find user data from database -----------------------
dataController.fetchUserData = (req, res, next) => {
	const { email } = req.body;
	console.log(`--------------------- searching for user: ${email}`);
	Data.findOne({ email }, function (err, userData) {
		if (err) {
			console.log(`Error in dataController.fetchUserData: ${err}`);
			return next(err);
		} else {
			console.log(`userData found for ${email}`);
			console.log(userData);
			res.locals.userData = userData;
			return next();
		}
	});
}

dataController.updatePeople = (req, res, next) => {
	const { email, people } = req.body;
	Data.findOneAndUpdate({ email }, { people }, { new: true }, function (err, userData) {
		if (err) {
			console.log(`Error in dataController.updatePeople: ${err}`);
			return next(err);
		} else {
			res.locals.userData = userData;
			return next();
		}
	});
}

dataController.addHint = (req, res, next) => {
	const { email, hint } = req.body;
	const { hints } = res.locals.userData;
	hints.push(hint);
	Data.findOneAndUpdate({ email }, { hints }, function (err, userData) {
		if (err) {
			console.log(`Error in dataController.addHint: ${err}`);
			return next(err);
		} else {
			res.locals.userData = userData;
			return next();
		}
	});
}


module.exports = dataController;