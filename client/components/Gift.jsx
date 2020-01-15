import React from 'react';

const Gift = (props) => (
	<div className="giftHolder">
    	<input rows="1" defaultValue={ props.gift} placeholder="add a gift" onChange={ e => props.updateGift(props.person, e.target.value, props.giftId)} />
    	<div className="removeGiftButton" onClick={ () => props.removeGift(props.person, props.giftId) }>-</div>
	</div>
);

export default Gift;