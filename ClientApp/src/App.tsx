import * as React from 'react';
import { useState } from 'react';
import IndividualEntrepreneur from './components/IndividualEntrepreneur'
import './custom.css'

export default () => {

    const [formOfOwnership, setFormOfOwnership] = useState('IP')

    return (
        <div className='content'>
            <h3 className='header'>Форма собственности</h3>
            <p className='lable'>Вид деятельности*</p>
            <select className = 'select-box mb-40' 
                    defaultValue = {formOfOwnership} 
                    onChange={(e) => setFormOfOwnership(e.target.value)}>
                <option value={'IP'}>Индивидуальный предприниматель (ИП)</option>
                <option value={'OOO'}>Общество с ограниченной ответственностью (ООО)</option>
            </select>
            {formOfOwnership==='IP' ? <IndividualEntrepreneur></IndividualEntrepreneur>: undefined}
        </div>
    )
};
