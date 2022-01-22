import React from 'react';
import "./medicine.css"
import { MedicineType } from './medicineType';

function isAfter(startDate, endDate) {
    const startDateEpoch = Date.parse(startDate);
    const endDateEpoch = Date.parse(endDate);
    return startDateEpoch > endDateEpoch;

}

const formatDate = (dated) => {
    const currentDate = new Date();
    let returnString = "";
    const formatDate = new Date(dated);
    if (formatDate.getDate() === currentDate.getDate() + 1) {
        returnString += "Tomorrow, "
    } else {
        returnString += "Today, "
    }
    return `${returnString} ${formatDate.toLocaleTimeString()}`;
}

const MedicineTile = ({medicine}) => {
    const { frequency, lastDoseTime, medicineName, medicineType, nextDoseTime } = medicine;
    let tileClass = "tile container text-info "
    const showRed = isAfter(medicine.nextDoseTime, new Date()) ? "bg-danger" : "bg-warning"
    tileClass+=showRed;
    return (
        <React.Fragment>
            <div className={tileClass}>
                <div className="row text-white text-center bg-info" id="header">
                    {medicineName}
                </div>
                <div className="row">
                    <div className="col">
                        Type   
                    </div>
                    <div className="col">
                        {MedicineType[medicineType]}
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col">
                        Frequency   
                    </div>
                    <div className="col">
                        {frequency}
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col">
                        Next drop time
                    </div>
                    <div className="col">
                        {formatDate(nextDoseTime)}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default MedicineTile;