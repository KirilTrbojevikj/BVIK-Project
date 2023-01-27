import React from 'react';

import { daysLeft } from '../utils';

const CustomCard = ({ owner, title, description, target,
    deadline, amountCollected, handleClick }) => {

    const remainingDays = daysLeft(deadline);

    return (
        <div onClick={handleClick}>
            <div>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>

            <div>
                <div>
                    <h4>{amountCollected}</h4>
                    <p>Raised of {target}</p>
                </div>

                <div>
                    <h4>{remainingDays}</h4>
                    <p>Days Left</p>
                </div>
            </div>

            <div>
                <p>Created by: <span>{owner}</span></p>
                
            </div>
        </div>
    )
}

export default CustomCard