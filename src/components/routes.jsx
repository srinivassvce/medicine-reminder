import React from 'react';
import { Route, Switch, useHistory } from 'react-router';
import { get, set } from '../storage/databaseApi';
import Home from './home';
import AddMedicineReminder from './medicine/addMedicineReminder';
import Medicines from './medicine/medicines';

const Routes = () => {
    const history = useHistory();
    const saveMedicineDetails = async (medicine) => {
        const medicines = await get("medicines");
        await set("medicines", [
            ...medicines,
            medicine
        ]);
        history.goBack();

    }
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/addMedicine">
                <AddMedicineReminder onSubmit={saveMedicineDetails} />
            </Route>
        </Switch>
    );
}

export default Routes;