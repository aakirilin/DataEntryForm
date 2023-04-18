import * as React from 'react';
import FileInput from './FileInput';
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState } from '../store';
import { actionCreators } from '../store/BanksForm';
import { Bank } from '../store/BanksForm';

const BanksForm = () =>{
    const dispatch = useDispatch();

    const banks = useSelector<ApplicationState, Array<Bank>| undefined>(state => state.banksForm?.banks) ?? new Array<Bank>();

    const addBank = () => dispatch(actionCreators.addBank());
    const setBIK = (index:number, value:string) => dispatch(actionCreators.setBIK(index, value));
    const setName = (index:number, value:string) => dispatch(actionCreators.setName(index, value));
    const setPaymentAccount = (index:number, value:string) => dispatch(actionCreators.setPaymentAccount(index, value));
    const setCorrespondentAccount = (index:number, value:string) => dispatch(actionCreators.setCorrespondentAccount(index, value));
    const upload = () => dispatch(actionCreators.upload());

    const ceanFillName = (index:number) => banks[index].BIK?.length === 9;
    const ceanFillCorrespondentAccount = (index:number) => banks[index].BIK?.length === 9;

    const fillName = (index:number, bik:string) => dispatch(actionCreators.fillName(index, bik)); 
    const fillCorrespondentAccount = (index:number, bik:string) => dispatch(actionCreators.fillCorrespondentAccount(index, bik));

    const ceanNextStep = banks.every(b => 
        (b.BIK?.length === 9) &&
        (b.Name?.length ?? 0 > 1) &&
        (b.PaymentAccount?.length === 20) &&
        (b.CorrespondentAccount?.length === 20)
    );

    return (
        <>
            <h3 className='header'>Банковские реквизиты</h3>
            {
                banks.map((b, i) => <div key={i}>
                    <div className='row mb-1rem'>
                        <div className='mr-16'>
                            <p className='lable'>БИК*</p>
                            <input className='text-input' 
                                    size={9} 
                                    maxLength={9} 
                                    placeholder='ххххххххх' 
                                    value={b.BIK}
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                          event.preventDefault();
                                        }
                                      }}
                                    onChange={(e) => setBIK(i, e.target.value)}>
                                </input>
                        </div>
                        <div className='mr-16'>
                            <p className='lable'>Название филиала банка*</p>
                            <p className='text-input row' ><input 
                                    size={40} 
                                    placeholder='Название филиала банка*' 
                                    value={b.Name}
                                    onChange={(e) => setName(i, e.target.value)}></input>
                                <button className='secendary-button'
                                        onClick={() => fillName(i, b.BIK)}
                                        disabled={!ceanFillName(i)}>Заполнить</button>        
                            </p>
                        </div>
                        <div className="row">
                            <div data-tooltip="Автоматическое заполнение названия филиала банка по БИК" className="hover">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 0C3.582 0 0 3.582 0 8C0 12.418 3.582 16 8 16C12.418 16 16 12.418 16 8C16 3.582 12.418 0 8 0ZM7 7C7 6.73478 7.10536 6.48043 7.29289 6.29289C7.48043 6.10536 7.73478 6 8 6C8.26522 6 8.51957 6.10536 8.70711 6.29289C8.89464 6.48043 9 6.73478 9 7V12C9 12.2652 8.89464 12.5196 8.70711 12.7071C8.51957 12.8946 8.26522 13 8 13C7.73478 13 7.48043 12.8946 7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12V7ZM8 5.016C7.86865 5.01597 7.73858 4.99006 7.61724 4.93976C7.4959 4.88947 7.38565 4.81576 7.29279 4.72286C7.19993 4.62995 7.12628 4.51967 7.07604 4.3983C7.02581 4.27693 6.99997 4.14685 7 4.0155C7.00003 3.88415 7.02594 3.75408 7.07624 3.63274C7.12653 3.5114 7.20024 3.40115 7.29314 3.30829C7.38605 3.21543 7.49633 3.14178 7.6177 3.09154C7.73907 3.04131 7.86914 3.01547 8.0005 3.0155C8.26578 3.01557 8.52017 3.12101 8.70771 3.30864C8.89525 3.49627 9.00057 3.75072 9.0005 4.016C9.00043 4.28128 8.89499 4.53567 8.70736 4.72321C8.51973 4.91075 8.26528 5.01607 8 5.016Z" fill="#5795FD"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className='row mb-1rem'>
                        <div className='mr-16'>
                            <p className='lable'>Рассчетный счет*</p>
                            <input className='text-input' 
                                    size={20} 
                                    maxLength={20} 
                                    placeholder='хххххххххххххххххххх' 
                                    value={b.PaymentAccount}
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                          event.preventDefault();
                                        }
                                      }}
                                    onChange={(e) => setPaymentAccount(i, e.target.value)}></input>
                        </div>
                        <div className='mr-16'>
                            <p className='lable'>Корреспондентский счет*</p>
                            <p className='text-input row' ><input 
                                    size={20} 
                                    maxLength={20} 
                                    placeholder='хххххххххххххххххххх' 
                                    value={b.CorrespondentAccount}
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                          event.preventDefault();
                                        }
                                      }}
                                    onChange={(e) => setCorrespondentAccount(i, e.target.value)}></input>
                                 <button className='secendary-button' 
                                         onClick={() => fillCorrespondentAccount(i, b.BIK)}
                                         disabled={!ceanFillCorrespondentAccount(i)}>Заполнить</button>        
                            </p>
                            
                        </div>
                        <div className="row">
                            <div data-tooltip="Автоматическое заполнение корреспондентского счета по БИК" className="hover">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 0C3.582 0 0 3.582 0 8C0 12.418 3.582 16 8 16C12.418 16 16 12.418 16 8C16 3.582 12.418 0 8 0ZM7 7C7 6.73478 7.10536 6.48043 7.29289 6.29289C7.48043 6.10536 7.73478 6 8 6C8.26522 6 8.51957 6.10536 8.70711 6.29289C8.89464 6.48043 9 6.73478 9 7V12C9 12.2652 8.89464 12.5196 8.70711 12.7071C8.51957 12.8946 8.26522 13 8 13C7.73478 13 7.48043 12.8946 7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12V7ZM8 5.016C7.86865 5.01597 7.73858 4.99006 7.61724 4.93976C7.4959 4.88947 7.38565 4.81576 7.29279 4.72286C7.19993 4.62995 7.12628 4.51967 7.07604 4.3983C7.02581 4.27693 6.99997 4.14685 7 4.0155C7.00003 3.88415 7.02594 3.75408 7.07624 3.63274C7.12653 3.5114 7.20024 3.40115 7.29314 3.30829C7.38605 3.21543 7.49633 3.14178 7.6177 3.09154C7.73907 3.04131 7.86914 3.01547 8.0005 3.0155C8.26578 3.01557 8.52017 3.12101 8.70771 3.30864C8.89525 3.49627 9.00057 3.75072 9.0005 4.016C9.00043 4.28128 8.89499 4.53567 8.70736 4.72321C8.51973 4.91075 8.26528 5.01607 8 5.016Z" fill="#5795FD"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>)
            }
            <button onClick={addBank} className='secendary-button mb-40'>
            <svg width="25" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="2" width="2" height="14" rx="1" fill="#5795FD"/>
                <rect x="2" y="10" width="2" height="14" rx="1" transform="rotate(-90 2 10)" fill="#5795FD"/>
            </svg>
                Добавить еще один банк</button>
            <button disabled={!ceanNextStep}
                    className='primary-button ml-auto'
                    onClick={upload}>Отправить</button>
        </>
    )
}

export default BanksForm;