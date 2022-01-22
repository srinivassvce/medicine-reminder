import React from 'react';

const Input = ({ name, value, label, onChange, type, error }) => {
    return (
        <div className="form-group">
            
            <label
                htmlFor={name}>
                <strong className="display-5">
                    {`${label} : `}
                </strong>
            </label>
            {error && <span className="alert alert-danger">{error}</span>}
            <input
                value={value}
                onChange={onChange}
                className="form-control"
                id={name}
                name={name}
                type={type}
            />
            
        </div>
    );
}

export default Input;