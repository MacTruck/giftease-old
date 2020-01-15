import React, { Component } from 'react';

import Gift from './Gift.jsx';

const Details = (props) => {
    return (
        <React.Fragment>
            <div id="saveButton" className="button" onClick={ props.saveGifts }>Back</div>
            { props.person.name === 'me' && <div id="dropHint" className="button" onClick={ props.toggleHint }>Drop a hint</div> }
            <h2>{ props.person.name }</h2>
            <form>
                { props.person.gifts.map( (gift) => 
                            <Gift person={ props.person }
                                  key={ gift.key }
                                  giftId={ gift.key }
                                  gift={ gift.content }
                                  updateGift={ props.updateGift }
                                  removeGift={ props.removeGift } />
                        )}
                <div id="addGiftButton" onClick={ () => props.addGift( props.person ) }>+</div>
            </form>
        </React.Fragment>
    )
}

export default Details;
