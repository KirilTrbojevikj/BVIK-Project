import React from 'react';
import './card.css';

import { daysLeft } from '../utils';

const CustomCard = ({ owner, title, description, target,
    deadline, amountCollected, handleClick }) => {

    const remainingDays = daysLeft(deadline);

    return (
        <div class="card">
            <div class="card2" onClick={handleClick}>
                <h3>{title}</h3>

                
                <p>Raised {amountCollected} of {target}</p>

                <h4>{remainingDays} Days Left</h4>

            </div>
        </div>

    )
}

export default CustomCard