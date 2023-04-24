import * as React from 'react';
import { useState } from 'react';

import FormOfOwnership from './components/FormOfOwnership'
import IndividualEntrepreneur from './components/IndividualEntrepreneur'
import LimitedLiabilityCompany from './components/LimitedLiabilityCompany'
import BanksForm from './components/BanksForm';
import { useSelector } from 'react-redux';
import { ApplicationState } from './store';
import './style.css'

const App = () => {

    const formOfOwnership = useSelector<ApplicationState, string|undefined>(state => state.formOfOwnership?.Form);
    const showBanksForm = useSelector<ApplicationState, boolean|undefined>(state => state.banksForm?.showBanksForm) ?? false;

    return (
        <div className='content'>
            {!showBanksForm ? <FormOfOwnership></FormOfOwnership>: undefined}
            {formOfOwnership==='IP' && !showBanksForm ? <IndividualEntrepreneur></IndividualEntrepreneur>: undefined}
            {formOfOwnership==='OOO' && !showBanksForm ? <LimitedLiabilityCompany></LimitedLiabilityCompany>: undefined}
            {showBanksForm ? <BanksForm></BanksForm>: undefined}

        </div>
    )
};

export default App;
