import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = (props) => {
	return (
		<form>
			<input type="text" name="name" placeholder="name" onChange={ (e) => props.updateInput(e.target) } />
			<input type="text" name="email" placeholder="email" onChange={ (e) => props.updateInput(e.target) } />
			<input type="password" name="password" placeholder="password" onChange={ (e) => props.updateInput(e.target) } />
			<div className="button" onClick={ () => props.createUser() }>Sign Up</div>
			<div className="signUpToggle" onClick={ () => props.toggleSignUp() }>Log In</div>
		</form>
	);
}

export default SignUp;
