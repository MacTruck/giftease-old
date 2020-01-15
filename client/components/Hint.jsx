import React, { Component } from 'react';

import Gift from './Gift.jsx';

const Hint = (props) => {
    return (
        <React.Fragment>
            <div id="backButton" className="button" onClick={ props.toggleHint }>Back</div>
            <form id="hintForm">
                <input type="text" name="hintee" placeholder="username to hint" onChange={ (e) => props.setHintee(e.target.value) } />
                <div className="button" onClick={ () => props.sendHint() } >Sent hint</div>
                { props.hinted.gifts.map( (gift) => 
                            <Gift person={ props.hinted }
                                  key={ gift.key }
                                  giftId={ gift.key }
                                  gift={ gift.content }
                                  updateGift={ props.updateGiftFromHint }
                                  removeGift={ props.removeGiftFromHint } />
                        )}
            </form>
        </React.Fragment>
    )
}

export default Hint;
