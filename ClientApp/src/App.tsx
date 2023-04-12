import * as React from 'react';
import { useState } from 'react';

import FormOfOwnership from './components/FormOfOwnership'
import IndividualEntrepreneur from './components/IndividualEntrepreneur'
import LimitedLiabilityCompany from './components/LimitedLiabilityCompany'
import { useSelector } from 'react-redux';
import { ApplicationState } from './store';
import './custom.css'

export default () => {

    const formOfOwnership = useSelector<ApplicationState, string|undefined>(state => state.formOfOwnership?.Form);

    return (
        <div className='content'>
            {formOfOwnership===undefined ? <FormOfOwnership></FormOfOwnership>: undefined}
            {formOfOwnership==='IP' ? <IndividualEntrepreneur></IndividualEntrepreneur>: undefined}
            {formOfOwnership==='OOO' ? <LimitedLiabilityCompany></LimitedLiabilityCompany>: undefined}
        </div>
    )
};
