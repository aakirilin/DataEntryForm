import * as React from 'react';
import FileInput from './FileInput';
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState } from '../store';
import { actionCreators } from '../store/LimitedLiabilityCompany';
import { actionCreators as banksActionCreators } from '../store/BanksForm';

const LimitedLiabilityCompany = () => {
    const dispatch = useDispatch();

    const fullName = useSelector<ApplicationState, string|undefined>(state => state.limitedLiabilityCompany?.FullName);
    const setFullName = (value:string) => dispatch(actionCreators.setFullName(value));

    const shortName = useSelector<ApplicationState, string|undefined>(state => state.limitedLiabilityCompany?.ShortName);
    const setShortName = (value:string) => dispatch(actionCreators.setShortName(value));

    console.log(shortName);

    const dateRegistration = useSelector<ApplicationState, Date|null|undefined>(state => state.limitedLiabilityCompany?.DateRegistration);
    const setDateRegistration = (value:Date|null) => dispatch(actionCreators.setDateRegistration(value));

    const inn = useSelector<ApplicationState, string|undefined>(state => state.limitedLiabilityCompany?.INN);
    const setINN = (value:string) => dispatch(actionCreators.setINN(value));

    const innFile = useSelector<ApplicationState, File|undefined>(state => state.limitedLiabilityCompany?.INNFile);
    const setINNFile = (file:File) => dispatch(actionCreators.setINNFile(file));

    const ogrn = useSelector<ApplicationState, string|undefined>(state => state.limitedLiabilityCompany?.OGRN);
    const setOGRN = (value:string) => dispatch(actionCreators.setOGRN(value));

    const ogrnFile = useSelector<ApplicationState, File|undefined>(state => state.limitedLiabilityCompany?.OGRNFile);
    const setOGRNFile = (file:File) => dispatch(actionCreators.setOGRNFile(file));

    const extractFromTheEGRIPFile = useSelector<ApplicationState, File|undefined>(state => state.limitedLiabilityCompany?.ExtractFromTheEGRIPFile);
    const setExtractFromTheEGRIPFile = (file:File) => dispatch(actionCreators.setExtractFromTheEGRIPFile(file));

    const leaseAgreementOfThePremisesFile = useSelector<ApplicationState, File|undefined>(state => state.limitedLiabilityCompany?.LeaseAgreementOfThePremisesFile);
    const setLeaseAgreementOfThePremisesFile = (file:File) => dispatch(actionCreators.setLeaseAgreementOfThePremisesFile(file));

    const noContract = useSelector<ApplicationState, boolean|undefined>(state => state.limitedLiabilityCompany?.NoСontract)?? false;
    const setNoСontract = (value:boolean) => dispatch(actionCreators.setNoСontract(value));

    const setShowBanksForm = () => dispatch(banksActionCreators.setShowBanksForm(true));

    return (
        <>
            <h3 className='header'>Общество с ограниченной ответственностью (ООО)</h3>
            <div className='row'>
                <div className='mr-16'>
                    <p className='lable'>Наименование полное*</p>
                    <p><input className='text-input' 
                              placeholder='Наименование полное*' 
                              size={50} 
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}></input></p>
                </div>
                <div className='mr-16'>
                    <p className='lable'>Наименование сокращенное*</p>
                    <p><input className='text-input' 
                              size={30} 
                              placeholder='Наименование сокращенное*' 
                              value={shortName}
                              onChange={(e) => setShortName(e.target.value)}></input></p>
                </div>
                <div className='mr-16'>
                    <p className='lable'>Дата регистрации*</p>
                    <p><input type='date'
                              value={`${dateRegistration?.toISOString()?.split('T')[0]}`}
                              onChange={e => setDateRegistration(e.target.valueAsDate)}
                              className='date-input' 
                              placeholder='дд.мм.гггг'></input></p>
                </div>
            </div>
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
                    <p className='lable'>ОГРН*</p>
                    <p><input className='text-input' 
                              size={15} 
                              maxLength={15} 
                              placeholder='ххххххххххххххх'
                              value={ogrn}
                              onChange={e => setOGRN(e.target.value)}></input></p>
                </div>
                <div>
                    <p className='lable'>Скан ОГРН*</p>
                    <FileInput file={ogrnFile} 
                               onChange={setOGRNFile}
                               placeholder='Выберите или перетащите файл'></FileInput>
                </div>
            </div>
            <div className='row mb-40'>
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
            <button className='primary-button' onClick={setShowBanksForm}>Далее</button>
        </>
    )
}

export default LimitedLiabilityCompany;