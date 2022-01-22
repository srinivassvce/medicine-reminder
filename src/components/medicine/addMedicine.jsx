import React from 'react';
import { get, set } from '../../storage/databaseApi';
import CustomDatePicker from '../inputComponents/datePicker';
import Input from '../inputComponents/input';
import Select from '../inputComponents/select';
import { MedicineType } from './medicineType';

const AddMedicine = ({onAdd}) => {

    const [medicine, setMedicine] = React.useState({
        medicineType: MedicineType.None,
        medicineName: "",
        frequency: 0,
        startDateTime: new Date(),
        lastDoseTime: new Date(),
        nextDoseTime: null,
        url: null
    })
    console.log(medicine);

    const handleSubmit = (e) => {
        e.preventDefault();
        // todo: to be saved
    }

    const getTypes = () => (
        MedicineType
    )

    const getFrequencies = () => (
        // number of times a day
        [
            1, 2, 3, 4, 5, 6, 8, 10, 12, 24
        ]
    )

    const setDate = (date, key, setMedicineCallback) => {
        console.log(date);
        setMedicineCallback(
            {
                ...medicine,
                [key]: date
            }
        )
    }

    const handleChange = (input, medicine, setMedicine) => {
        const {name, value} = input;
        setMedicine({
            ...medicine,
            [name]: value
        });
    }

    return (
        /**
         * For adding a medicine, the required fields are:
         * 1. Type of medicine
         * 2. Name of medicine
         * 3. Frequency(whole number ranging from 0 to number of minutes in a day)
         * 4. start date
         * 5. start time
         * 6. last dose time(to calculate next dose time)
         * 7. URL image(optional)
         */
        <div className="container bg-default text-black">
            <form onSubmit={handleSubmit}>
                <fieldset style={{
                    border: "5px solid grey", padding: 30
                }}>
                    <legend className="text-center display-3" style={{ width: "auto" }}> Add Medicine </legend>
                    <Select
                        name="medicineType"
                        label="Medicine Type"
                        values={getTypes()}
                        onChange={({currentTarget}) => handleChange(currentTarget, medicine, setMedicine)}
                    />
                    <Input
                        name="medicineName"
                        value={medicine.medicineName}
                        type="text"
                        onChange={({ currentTarget: input }) => handleChange(input, medicine, setMedicine)}
                        label="Medicine Name"
                    />
                    <CustomDatePicker
                        name="startDateTime"
                        label="Select Start date and time"
                        date={medicine.startDateTime}
                        showTimeSelect={true}
                        onDateChange={(changedDate) => setDate(changedDate, "startDateTime", setMedicine)}
                    />
                    <Select 
                        label="Frequency"
                        name="frequency"
                        values={getFrequencies()}
                        onChange={({currentTarget}) => handleChange(currentTarget, medicine, setMedicine)}
                    />
                    <CustomDatePicker
                        name="lastDoseTime"
                        label="Select Last dose date and time"
                        date={medicine.lastDoseTime}
                        onDateChange={(changedDate) => setDate(changedDate, "lastDoseTime", setMedicine)}
                        minDate={medicine.startDateTime}
                        showTimeSelect={true}
                    />
                </fieldset>
                <button className="btn btn-primary" onClick={() => onAdd(medicine)}>Add</button>
            </form>
        </div>
    );
}

export default AddMedicine;