import React from 'react'

const FormField = ({ labelName, placeholder,
    inputType, isTextArea, value, handleChange }) => {
    return (
        <label>
            {labelName && (
                <div>{labelName}</div>
            )}
            {isTextArea ? (
                <textarea
                    required
                    value={value}
                    onChange={handleChange}
                    rows={10}
                    placeholder={placeholder}
                />
            ) : (
                <input
                    required
                    value={value}
                    onChange={handleChange}
                    type={inputType}
                    step="0.1"
                    placeholder={placeholder}

                />
            )}
        </label>
    )
}

export default FormField