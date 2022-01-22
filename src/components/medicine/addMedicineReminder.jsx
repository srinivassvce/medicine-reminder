import React, { useState } from 'react';
import CustomDatePicker from '../inputComponents/datePicker';
import Input from '../inputComponents/input';
import Select from '../inputComponents/select';
import Layout from '../layout';

import DatePicker from 'react-datepicker';
import { MedicineType } from './medicineType';

const handleChange = ({ name, value }, medicine, setMedicineCb) => {
    setMedicineCb(
        {
            ...medicine,
            [name]: value
        }
    )
}

const AddMedicineReminder = ({ onSubmit }) => {

    const medicineInitial = {
        name: "",
        type: MedicineType.Drop,
        times: [
        ],
        startDate: new Date(),
        endDate: new Date()
    }
    const [medicine, setMedicine] = useState(medicineInitial);
    console.log(medicine.times);
    const [rowCount, setRowCount] = useState(1);
    const setDate = (date, key, setMedicineCallback) => {
        console.log(date);
        setMedicineCallback(
            {
                ...medicine,
                [key]: date
            }
        )
    }

    const setTime = (time, key) => {
        console.log(time.getHours());
        console.log(time.getMinutes())
        const {times} = medicine;
        let selectedTime = {
            hours: time.getHours(),
            minutes: time.getMinutes()
        }
        times[key] = selectedTime;
        setMedicine(
            {
                ...medicine,
                times
            }
        )
    }

    const selectedTime = (time) => {
        console.log(time);
        if (time !== undefined) {
            const date = new Date();
            date.setHours(time.hours);
            date.setMinutes(time.minutes);
            return date;
        }
        return new Date();
    }

    const renderRows = () => {
        const nodes = []
        for (let i = 0; i < rowCount; i++) {
            const propName = `times[${i}]`;
            nodes.push(
                <React.Fragment>
                    <div className="container">
                        <div className="row">
                            <div className="col-9 m-2">
                                <CustomDatePicker
                                    selected={selectedTime(medicine.times[i])}
                                    label="Time"
                                    name={propName}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    onDateChange={(changedDate) => setTime(changedDate, i)}
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                />
                            </div>
                            <div className="col-2">

                                <button className="btn btn-success" onClick={(e) => addRowCount(e)}>+</button>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
        return nodes;
    }
    const addRowCount = (e) => {
        e.preventDefault();
        setRowCount(rowCount + 1);
    }
    return (
        <React.Fragment>
            <Layout title="Add Reminder">
                <div className="container">

                    <form onSubmit={() => onSubmit(medicine)}>
                        <fieldset style={{
                            border: "5px solid grey", padding: 30
                        }}>
                            <Input
                                label="Name"
                                name="name"
                                type="text"
                                value={medicine.name}
                                onChange={({ currentTarget }) => handleChange(currentTarget, medicine, setMedicine)}
                            />
                            <Select
                                label="Type"
                                name="type"
                                values={MedicineType}
                                onChange={({ currentTarget }) => handleChange(currentTarget, medicine, setMedicine)}
                            />
                            <CustomDatePicker
                                label="Start Date"
                                name="startDate"
                                date={medicine.startDate}
                                onDateChange={(changedDate) => setDate(changedDate, "startDate", setMedicine)}
                                dateFormat="MMMM d, yyyy"
                            />
                            <CustomDatePicker
                                label="End Date"
                                name="endDate"
                                date={medicine.endDate}
                                onDateChange={(changedDate) => setDate(changedDate, "endDate", setMedicine)}
                                minDate={medicine.startDate}
                                dateFormat="MMMM d, yyyy"
                            />
                            <div className="row">
                                {renderRows()}
                            </div>
                        </fieldset>
                    </form>
                    <button className="btn btn-success" id="submit" onClick={() => onSubmit(medicine)}>Add</button>
                </div>

            </Layout>
        </React.Fragment>
    );
}

export default AddMedicineReminder;