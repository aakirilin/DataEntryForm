import * as React from 'react';
import {useState} from 'react';
import FileInput from './FileInput';

const IndividualEntrepreneur = () => {


    const [noContract, setNoСontract] = useState(false);



    return (
        <>
            <h3 className='header'>Индивидуальный предприниматель (ИП)</h3>
            <div className='row'>
                <div className='mr-16'>
                    <p className='lable'>ИНН*</p>
                    <p><input className='text-input' placeholder='хххххххххх'></input></p>
                </div>
                <div className='mr-16'>
                    <p className='lable'>Скан ИНН*</p>
                    <FileInput placeholder='Выберите или перетащите файл'></FileInput>
                </div>
                <div className='mr-16'>
                    <p className='lable'>ОГРНИП*</p>
                    <p><input className='text-input' placeholder='ххххххххххххххх'></input></p>
                </div>
                <div>
                    <p className='lable'>Скан ОГРНИП*</p>
                    <FileInput placeholder='Выберите или перетащите файл'></FileInput>
                </div>
            </div>
            <div className='row'>
                <div className='mr-16'>
                    <p className='lable'>Дата регистрации*</p>
                    <p><input type='date' className='date-input' placeholder='дд.мм.гггг'></input></p>
                </div>
                <div className='mr-16'>
                    <p className='lable'>Скан выписки из ЕГРИП (не старше 3 месяцев)*</p>
                    <FileInput placeholder='Выберите или перетащите файл'></FileInput>
                </div>
                <div className='mr-16'>
                    <p className='lable'>Скан договора аренды помещения (офиса)</p>
                    <FileInput placeholder='Выберите или перетащите файл'></FileInput>
                </div>
                <label className='row'>
                    <input type="checkbox" onChange={() => {setNoСontract(!noContract); }} />
                    <span className={`checkbox ${noContract ? "checkbox--active" : ""}`} aria-hidden="true" />
                    Нет договора
                </label>
            </div>
        </>
    )
}

export default IndividualEntrepreneur;