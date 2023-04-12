import * as React from 'react';
import FileInput from './FileInput';
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState } from '../store';
import { actionCreators } from '../store/IndividualEntrepreneur';

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

    return (
        <>
            <h3 className='header'>Индивидуальный предприниматель (ИП)</h3>
            <div className='row'>
                <div className='mr-16'>
                    <p className='lable'>ИНН*</p>
                    <p><input className='text-input' 
                              size={10} 
                              maxLength={10} 
                              placeholder='хххххххххх' 
                              defaultValue={inn}
                              onChange={(e) => setINN(e.target.value)}></input></p>
                </div>
                <div className='mr-16'>
                    <p className='lable'>Скан ИНН*</p>
                    <FileInput file={innFile} 
                               onChange={setINNFile}
                               placeholder='Выберите или перетащите файл'></FileInput>
                </div>
                <div className='mr-16'>
                    <p className='lable'>ОГРНИП*</p>
                    <p><input className='text-input' 
                              size={15} 
                              maxLength={15} 
                              placeholder='ххххххххххххххх'
                              defaultValue={ogrnip}
                              onChange={e => setOGRNIP(e.target.value)}></input></p>
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
                    <p><input type='date'
                              defaultValue={`${dateRegistration}`}
                              onChange={e => setDateRegistration(e.target.valueAsDate)}
                              className='date-input' 
                              placeholder='дд.мм.гггг'></input></p>
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
                <label className='row'>
                    <input type="checkbox" 
                           onChange={() => {setNoСontract(!noContract); }} />
                    <span className={`checkbox ${noContract ? "checkbox--active" : ""}`} 
                          aria-hidden="true" />
                    Нет договора
                </label>
            </div>
            <button className='primary-button'>Далее</button>
        </>
    )
}

export default IndividualEntrepreneur;