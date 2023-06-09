﻿import * as React from 'react';
import FileInput from './FileInput';
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState } from '../store';
import { actionCreators } from '../store/IndividualEntrepreneur';
import { actionCreators as banksActionCreators } from '../store/BanksForm';

const IndividualEntrepreneur = () => {
    const dispatch = useDispatch();

    const inn = useSelector<ApplicationState, string|undefined>(state => state.individualEntrepreneur?.INN);
    const setINN = (value:string) => dispatch(actionCreators.setINN(value));

    const innFile = useSelector<ApplicationState, File|undefined>(state => state.individualEntrepreneur?.INNFile);
    const setINNFile = (file:File) => dispatch(actionCreators.setINNFile(file));

    const ogrnip = useSelector<ApplicationState, string|undefined>(state => state.individualEntrepreneur?.OGRNIP);
    const setOGRNIP = (value:string) => dispatch(actionCreators.setOGRNIP(value));

    const ogrnipFile = useSelector<ApplicationState, File|undefined>(state => state.individualEntrepreneur?.OGRNIPFile);
    const setOGRNIPFile = (file:File) => dispatch(actionCreators.setOGRNIPFile(file));

    const dateRegistration = useSelector<ApplicationState, Date|null|undefined>(state => state.individualEntrepreneur?.DateRegistration);
    const setDateRegistration = (value:Date|null) => dispatch(actionCreators.setDateRegistration(value));

    const extractFromTheEGRIPFile = useSelector<ApplicationState, File|undefined>(state => state.individualEntrepreneur?.ExtractFromTheEGRIPFile);
    const setExtractFromTheEGRIPFile = (file:File) => dispatch(actionCreators.setExtractFromTheEGRIPFile(file));

    const leaseAgreementOfThePremisesFile = useSelector<ApplicationState, File|undefined>(state => state.individualEntrepreneur?.LeaseAgreementOfThePremisesFile);
    const setLeaseAgreementOfThePremisesFile = (file:File) => dispatch(actionCreators.setLeaseAgreementOfThePremisesFile(file));

    const noContract = useSelector<ApplicationState, boolean|undefined>(state => state.individualEntrepreneur?.NoСontract)?? false;
    const setNoСontract = (value:boolean) => dispatch(actionCreators.setNoСontract(value));

    const setShowBanksForm = () => dispatch(banksActionCreators.setShowBanksForm(true));

    const ceanNextStep = (inn?.length === 10 ?? false) &&
                         (innFile) &&
                         (ogrnip?.length === 15 ?? false) &&
                         (ogrnipFile) &&
                         (dateRegistration) &&
                         (extractFromTheEGRIPFile) &&
                         (extractFromTheEGRIPFile) &&
                         (leaseAgreementOfThePremisesFile || noContract)

    return (
        <>
            <h3 className='header'>Индивидуальный предприниматель (ИП)</h3>
            <div className='row mb-1rem'>
                <div className='mr-16'>
                    <p className='lable'>ИНН*</p>
                    <input className='text-input' 
                              pattern='\d{10}'
                              size={10} 
                              maxLength={10} 
                              placeholder='хххххххххх' 
                              value={inn}
                              onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                  event.preventDefault();
                                }
                              }}
                              onChange={(e) => setINN(e.target.value)}></input>
                </div>
                <div className='mr-16'>
                    <p className='lable'>Скан ИНН*</p>
                    <FileInput file={innFile} 
                               onChange={setINNFile}
                               placeholder='Выберите или перетащите файл'></FileInput>
                </div>
                <div className='mr-16'>
                    <p className='lable'>ОГРНИП*</p>
                    <input className='text-input' 
                              pattern='\d{15}'
                              size={15} 
                              maxLength={15} 
                              placeholder='ххххххххххххххх'
                              value={ogrnip}
                              onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                  event.preventDefault();
                                }
                              }}
                              onChange={e => setOGRNIP(e.target.value)}></input>
                </div>
                <div>
                    <p className='lable'>Скан ОГРНИП*</p>
                    <FileInput file={ogrnipFile} 
                               onChange={setOGRNIPFile}
                               placeholder='Выберите или перетащите файл'></FileInput>
                </div>
            </div>
            <div className='row mb-40'>
                <div className='mr-16'>
                    <p className='lable'>Дата регистрации*</p>
                    <input type='date'
                              value={`${dateRegistration?.toISOString()?.split('T')[0]}`}
                              onChange={e => setDateRegistration(e.target.valueAsDate)}
                              className='date-input' 
                              placeholder='дд.мм.гггг'></input>
                </div>
                <div className='mr-16'>
                    <p className='lable'>Скан выписки из ЕГРИП (не старше 3 месяцев)*</p>
                    <FileInput file={extractFromTheEGRIPFile} 
                               onChange={setExtractFromTheEGRIPFile} 
                               placeholder='Выберите или перетащите файл'></FileInput>
                </div>
                <div className='mr-16'>
                    <p className='lable'>Скан договора аренды помещения (офиса)</p>
                    <FileInput file={leaseAgreementOfThePremisesFile} 
                               onChange={setLeaseAgreementOfThePremisesFile}
                               placeholder='Выберите или перетащите файл'></FileInput>
                </div>
                <label className='row mt-1rem'>
                    <input type="checkbox" 
                           onChange={() => {setNoСontract(!noContract); }} />
                    <span className={`checkbox ${noContract ? "checkbox--active" : ""}`} 
                          aria-hidden="true" />
                    Нет договора
                </label>
            </div>
            <button disabled={!ceanNextStep} 
                    className='primary-button ml-auto' 
                    onClick={setShowBanksForm}>Далее</button>
        </>
    )
}

export default IndividualEntrepreneur;