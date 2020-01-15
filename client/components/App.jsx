import React, { Component } from 'react';
import axios from 'axios';

import Header from './Header.jsx';
import SignUp from './SignUp.jsx';
import Login from './Login.jsx';
import Footer from './Footer.jsx';
import Home from './Home.jsx';
import Details from './Details.jsx';
import Hint from './Hint.jsx';
import HintFlag from './HintFlag.jsx';

class App extends React.Component {
	constructor (props) {
		super();

		this.state = {
			isHint: false,
			isSignedUp: false,
			isLoggedIn: false,
			displayDetails: false,
			name: '',
			email: '',
			password: '',
			people: [],
			newPerson: '',
			newGift: {},
			person: {},
			hinted: {},
			hints: [],
		};

		this.toggleSignUp = this.toggleSignUp.bind(this);
		this.updateInput = this.updateInput.bind(this);
		this.createUser = this.createUser.bind(this);
		this.loginUser = this.loginUser.bind(this);
		this.addPerson = this.addPerson.bind(this);
		this.showDetails = this.showDetails.bind(this);
		this.addGift = this.addGift.bind(this);
		this.removeGift = this.removeGift.bind(this);
		this.updateGift = this.updateGift.bind(this);
		this.saveGifts = this.saveGifts.bind(this);
		this.toggleHint = this.toggleHint.bind(this);
		this.setHintee = this.setHintee.bind(this);
		this.updateGiftFromHint = this.updateGiftFromHint.bind(this);
		this.removeGiftFromHint = this.removeGiftFromHint.bind(this);
		this.sendHint = this.sendHint.bind(this);
	}

	toggleSignUp() {
		this.setState( prevState => ({
			isSignedUp: !prevState.isSignedUp
		}));
	}

	updateInput(inputTarget) {
		const updates = {};
		updates[inputTarget.name] = inputTarget.value;
		this.setState(updates);
	}

	createUser() {
		const user = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
		}
		axios
			.post('/signUp', user)
			.then(response => {
				this.setState({ isLoggedIn:true, password: '***', ...response.data.userData});
			});
	}

	loginUser() {
		const user = {
			email: this.state.email,
			password: this.state.password,
		}
		axios
			.post('/login', user)
			.then(response => {
				this.setState({ isLoggedIn:true, password: '***', ...response.data.userData });
			});
	}

	addPerson() {
		if (this.state.newPerson != '') {
			const newPerson = {};
			newPerson.name = this.state.newPerson;
			newPerson.gifts = [{ key: 0, content: '' }];
			const newPersonList = [...this.state.people];
			newPersonList.push(newPerson);
			axios
				.post('/updatePeople', { email: this.state.email, people: newPersonList })
				.then(response => {
					this.setState({ ...response.data.userData });
				});
		}
	}

	showDetails(name) {
		const person = this.state.people.filter(el => el.name === name)[0];
		this.setState( prevState => ({
			displayDetails: !prevState.displayDetails,
			person,
		}));
	}

	updateGift(person, giftData, giftKey) {
		person.gifts = person.gifts.map( gift => gift.key === giftKey ? { ...gift, content: giftData } : gift );
		this.setState({ person });
	}

	addGift(person) {
		if (person.gifts[(person.gifts.length - 1)].content !== '' ) {
			person.gifts.push({ key: person.gifts.length + 1, content: '' });
			this.setState({ person });
		}
	}

	removeGift(person, giftId) {
		if (person.gifts.length > 1) {
			let updatedPerson = {
				...person,
				gifts: person.gifts.filter(gift => gift.key !== giftId)
			}
			this.setState({ person: updatedPerson });
		}
	}

	saveGifts() {
		const newPeopleList = this.state.people.map( person => person.name === this.state.person.name ? {...this.state.person} : person );
		axios
			.post('/updatePeople', { email: this.state.email, people: newPeopleList })
			.then(response => {
				this.setState({ displayDetails: false, ...response.data.userData });
			});
	}

	toggleHint() {
		if (!this.state.isHint) {
			this.saveGifts();
		}
		this.setState(prevState => ({
			isHint: !prevState.isHint,
			hinted: { hinter: this.state.email, gifts: [...this.state.person.gifts]}
		}));
	}

	setHintee(email) {
		this.setState(prevState => ({
			hinted: { ...prevState.hinted, hintee: email }
		}));
	}

	updateGiftFromHint(hinted, giftData, giftKey) {
		hinted.gifts = hinted.gifts.map( gift => gift.key === giftKey ? { ...gift, content: giftData } : gift );
		this.setState({ hinted }, () => console.log(this.state.hinted));
	}

	removeGiftFromHint(hinted, giftId) {
		if (hinted.gifts.length > 1) {
			let updatedHint = {
				...hinted,
				gifts: hinted.gifts.filter(gift => gift.key !== giftId)
			}
			this.setState({ hinted: updatedHint }, () => console.log(this.state.hinted));
		}
	}

	sendHint() {
		const query = {
			email: this.state.hinted.hintee,
			hint: { email: this.state.email, gifts: this.state.hinted.gifts }
		};
		axios
			.post('/hint', query)
			.then(response => {
				this.setState({ isHint: false });
			});
	}

	render() {
		return (
			<React.Fragment>
				<Header />
					{ this.state.hints.length > 0 && <HintFlag />}
					{ this.state.isHint ?
					 		<Hint hinted={ this.state.hinted } toggleHint={ this.toggleHint } setHintee={ this.setHintee } sendHint={ this.sendHint } updateGiftFromHint={ this.updateGiftFromHint } removeGiftFromHint={ this.removeGiftFromHint } />
						: this.state.displayDetails ? (
							<Details person={ this.state.person } saveGifts={ this.saveGifts } toggleHint={ this.toggleHint } addGift={ this.addGift } removeGift={ this.removeGift } updateGift={ this.updateGift } />
						) : this.state.isLoggedIn ? (
							<Home people={ this.state.people } showDetails={ this.showDetails } updateInput={ this.updateInput } addPerson={ this.addPerson }/>
						) : this.state.isSignedUp ? (
							<Login toggleSignUp={ this.toggleSignUp } updateInput={ this.updateInput } loginUser={ this.loginUser } />
						) : (
							<SignUp toggleSignUp={this.toggleSignUp} updateInput={ this.updateInput } createUser={ this.createUser }  />
						)
					}
				<Footer />
			</React.Fragment>
		);
	}
}

export default App;