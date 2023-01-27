import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomCard from './CustomCard';


const DisplayHealthCases = ({ title, isLoading, healthCases }) => {

    const navigate = useNavigate();

    const handleNavigate = (healthCase) => {
        navigate(`/details/${healthCase.title}`, { state: healthCase})
    }

    return (
        <div>
            <h1>{title} ({healthCases.length})</h1>

            <div>
                {!isLoading && healthCases.length > 0 && healthCases.map(
                    (healthCase) => <CustomCard
                        key={healthCase.id}
                        {...healthCase}
                        handleClick={() => handleNavigate(healthCase)}

                    />)}
            </div>
        </div>
    )
}

export default DisplayHealthCases