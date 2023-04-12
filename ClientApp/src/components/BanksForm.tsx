import * as React from 'react';
import FileInput from './FileInput';
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState } from '../store';
import { actionCreators } from '../store/BanksForm';
import { Bank } from '../store/BanksForm';

const BanksForm = () =>{
    const dispatch = useDispatch();

    const banks = useSelector<ApplicationState, Array<Bank>| undefined>(state => state.banksForm?.banks) ?? new Array<Bank>();

    const setBIK = (index:number, value:string) => dispatch(actionCreators.setBIK(index, value));
    const setName = (index:number, value:string) => dispatch(actionCreators.setName(index, value));
    const setPaymentAccount = (index:number, value:string) => dispatch(actionCreators.setPaymentAccount(index, value));
    const setCorrespondentAccount = (index:number, value:string) => dispatch(actionCreators.setCorrespondentAccount(index, value));

    return (
        <>
            <h3 className='header'>Банковские реквизиты</h3>
            {
                banks.map((b, i) => <>
                    <div className='row'>
                        <div className='mr-16'>
                            <p className='lable'>БИК*</p>
                            <p><input className='text-input' 
                                    size={9} 
                                    maxLength={9} 
                                    placeholder='ххххххххх' 
                                    value={b.BIK}
                                    onChange={(e) => setBIK(i, e.target.value)}></input></p>
                        </div>
                        <div className='mr-16'>
                            <p className='lable'>Название филиала банка*</p>
                            <p><input className='text-input' 
                                    size={40} 
                                    placeholder='Название филиала банка*' 
                                    value={b.Name}
                                    onChange={(e) => setName(i, e.target.value)}></input></p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='mr-16'>
                            <p className='lable'>Рассчетный счет*</p>
                            <p><input className='text-input' 
                                    size={20} 
                                    maxLength={20} 
                                    placeholder='хххххххххххххххххххх' 
                                    value={b.PaymentAccount}
                                    onChange={(e) => setPaymentAccount(i, e.target.value)}></input></p>
                        </div>
                        <div className='mr-16'>
                            <p className='lable'>Корреспондентский счет*</p>
                            <p><input className='text-input' 
                                    size={20} 
                                    maxLength={20} 
                                    placeholder='хххххххххххххххххххх' 
                                    value={b.CorrespondentAccount}
                                    onChange={(e) => setCorrespondentAccount(i, e.target.value)}></input></p>
                        </div>
                    </div>
                </>)
            }
            <button>Добавить еще один банк</button>
        </>
    )
}

export default BanksForm;