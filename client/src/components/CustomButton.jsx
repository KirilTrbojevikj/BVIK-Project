import React from 'react'

const CustomButton = ({ btnType, title, handleClick }) => {
    return (
        <button
            type={btnType}
            onClick={handleClick}
        >
            {title}

        </button>
    )
}

export default CustomButton