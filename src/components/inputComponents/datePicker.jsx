import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomDatePicker = (props) => {
    const { label, name, date, time, onDateChange, minDate } = props;
    return (<div className="form-group">

        <label className="m-2"
            htmlFor={name}>
            <strong className="display-5">
                {`${label} : `}
            </strong>
        </label>
        <DatePicker
            onChange={onDateChange}
            selected={date}
            dateFormat="MMMM d, yyyy h:mm aa"
            timeIntervals={30}
            timeCaption="Time"
            minDate={minDate}
            {...props}
        />

    </div>);
}

export default CustomDatePicker;