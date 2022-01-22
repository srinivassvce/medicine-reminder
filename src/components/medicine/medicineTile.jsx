import React from 'react';
import { padWithZeros } from '../util/util';
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
    return `${returnString} ${formatDate.toLocaleDateString()}`;
}

const MedicineTile = ({ medicine }) => {

    const renderTimes = () => {
        const timesCopy = frequency ? frequency : [];
        return timesCopy.map(
            time => (
                <div className="row field">
                    <div className="col">{padWithZeros(time.hours)}:{padWithZeros(time.minutes)}</div>
                </div>
            )
        )
    }
    const { medicineName, type, frequency, startDate, endDate } = medicine;
    let tileClass = "tile container text-info text-center bg-warning"
    return (
        <React.Fragment>
            <div className={tileClass}>
                <div className="row text-white text-center bg-info" id="header">
                    {medicineName}
                </div>
                <div className="row field">
                    <div className="col">
                        Type
                    </div>
                    <div className="col">
                        {type}
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col">
                        Times
                    </div>
                    <div className="col">
                        {renderTimes()}
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12">
                        <div className="row field">
                            <div className="col">
                                start-date
                        </div>
                            <div className="col">
                                {formatDate(startDate)}
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col">
                                End-date
                        </div>
                            <div className="col">
                                {formatDate(endDate)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default MedicineTile;