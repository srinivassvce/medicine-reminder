import React from 'react';
import ReactModal from 'react-modal';
import { remove } from '../storage/databaseApi';
import Layout from './layout';
import AddMedicine from './medicine/addMedicine';
import Medicines from './medicine/medicines';
const Home = () => {
    return (
        <React.Fragment>
            <Layout>
                <div className="container">
                    <Medicines />
                </div>
            </Layout>
        </React.Fragment>

    );
}

export default Home;