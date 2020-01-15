import React, { Component } from 'react';

import Person from './Person.jsx';

const Home = (props) => {
	return (
		<React.Fragment>
			<form>
				<input type="text" name="newPerson" placeholder="new giftee" onBlur={(e) => props.updateInput(e.target)} />
				<div className="button" onClick={() => props.addPerson()} >Add Giftee</div>
			</form>
			<ul className="peopleList">
				<React.Fragment>
					{ props.people
						.map( person => 
							<Person name={person.name} showDetails={ props.showDetails } />
						)
					}
				</React.Fragment>
			</ul>
		</React.Fragment>
	)
}

export default Home;