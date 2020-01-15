import React from 'react';
import { Link } from 'react-router-dom';

const Login = (props) => {
	return (
		<form>
			<input type="text" name="email" placeholder="username" onChange={ (e) => props.updateInput(e.target) } />
			<input type="password" name="password" placeholder="password" onChange={ (e) => props.updateInput(e.target) } />
			<div className="button" onClick={ () => props.loginUser() } >Log In</div>
			<div className="signUpToggle" onClick={() => props.toggleSignUp() }>Sign Up</div>
		</form>
	);
}

export default Login;
