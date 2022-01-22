import React from 'react';

const getOptions = (values) => {
    console.log(values);
    const options = [];
    for(const key in values) {
        options.push(<option selected value={values[key]}>{key}</option>)
    }
    return options;
}
const Select = ({ name, label, values, onChange }) => {
    return (
        <React.Fragment>
            <label
                htmlFor={name}>
                <strong className="display-5">
                    {`${label} : `}
                </strong>
            </label>
            <select
                name={name}
                className="form-select form-control"
                aria-label="Default select example"
                onChange={ onChange}
            >
                {getOptions(values)}
            </select>
        </React.Fragment>

    );
}

export default Select;