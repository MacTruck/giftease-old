import React from 'react';

const Person = (props) => (
	<li>
		<span id={ props.name } className="personListItem personName" onClick={ (e) => props.showDetails(e.target.id) }>{ props.name }</span>
	</li>
);

export default Person;