import React from 'react';
import ReactModal from 'react-modal';
import AddMedicine from './medicine/addMedicine';
import Medicines from './medicine/medicines';
const Layout = (props) => {
    const title = props.title || "Medicine Reminder";
    return (
        <React.Fragment>
            <div className="bg-info text-center display-3">
                {title}
            </div>
            {props.children}
        </React.Fragment>
    );
}

export default Layout;