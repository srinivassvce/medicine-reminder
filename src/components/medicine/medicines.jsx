import React, { useEffect } from 'react';
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';
import { scheduleNotifications } from '../../background/localNotifications';
import { get, set } from '../../storage/databaseApi';
import { isAfter } from '../../utils/utils';
import AddMedicine from './addMedicine';
import MedicineTile from './medicineTile';
const Medicines = () => {
    const [medicines, setMedicines] = React.useState([]);
    const fetchMedicines = async () => {
        const response = await get("medicines");
        if (response !== null) {
            scheduleNotifications(response);
            setMedicines(
                response
            )
        }
    }

    useEffect(
        () => fetchMedicines(), []
    )
    console.log(medicines);
    const clearAllMedicinesList = async () => {
        await set("medicines", [])
        setMedicines([]);
    }

    const getNextDoseTime = ({ frequency, lastDoseTime }) => {
        const date = new Date(); // current time
        if (frequency === 0) {
            frequency = 1;
        }
        const frequencyInHours = 24 / frequency;
        var lastDoseTimeDate = new Date(Date.parse(lastDoseTime))

        const nextDoseTime = lastDoseTimeDate.setHours(frequencyInHours + lastDoseTimeDate.getHours())
        if (isAfter(date, nextDoseTime)) {
            console.log("Already due");
        }
        return nextDoseTime;
    }

    const saveMedicine = async (medicine) => {
        const currentList = await get("medicines");
        medicine = {
            ...medicine,
            nextDoseTime: getNextDoseTime(medicine)
        }
        await set("medicines", [
            ...currentList, medicine
        ])
        console.log(medicine);
        console.log("saved")
    }


    const saveMedicineAndCloseModal = async (medicine) => {
        await saveMedicine(medicine);
        setMedicines([
            ...medicines, medicine
        ])
        displayModal(false);
    }


    const [showModal, setShowModal] = React.useState(false);
    const displayModal = (showModal) => setShowModal(showModal);
    return (
        <React.Fragment>
            <ReactModal isOpen={showModal}>
                <div>
                    <AddMedicine onAdd={(medicine) => saveMedicineAndCloseModal(medicine)} />
                </div>
                <div className="footer">
                    <button className="btn btn-close" onClick={() => displayModal(false)}>
                        Close
                        </button>
                </div>
            </ReactModal>
            <div className="container m-3">
                <div className="row">
                    <div className="col-md-4">
                        <button className="btn btn-success" onClick={() => displayModal(true)}>Add New Medicine</button>
                    </div>
                    <div className="col-md-4">
                        <Link to="/addMedicine">
                            <button className="btn btn-success" onClick={() => displayModal(true)}>Add Reminder</button>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <button className="btn btn-primary" onClick={() => clearAllMedicinesList()}>
                            Clear List
           </button>
                    </div>
                </div>

            </div>
            <div className="container">

                <div className="row">
                    {
                        medicines.map(
                            medicine => null !== medicine ? (
                                <div className="col-12 col-md-6">
                                    <MedicineTile medicine={medicine} />
                                </div>
                            ) : null
                        )
                    }
                </div>
            </div>

        </React.Fragment>


    );
}

export default Medicines;