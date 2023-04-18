import { Reducer } from 'redux';
import axios from 'axios';
import { AppThunkAction } from './'

export interface Bank {
    BIK:string,
    Name:string,
    PaymentAccount:string,
    CorrespondentAccount:string
}

export interface BanksFormState {
    showBanksForm:boolean,
    banks: Array<Bank>
}

export interface AddBank { type: 'Banks_AddBank' }
export interface SetBIK { type: 'Banks_SetBIK' }
export interface SetName { type: 'Banks_SetName' }
export interface SetPaymentAccount { type: 'Banks_SetPaymentAccount' }
export interface SetCorrespondentAccount { type: 'Banks_SetCorrespondentAccount' }
export interface SetShowBanksForm { type: 'Banks_SetShowBanksForm' }
export interface SetBankInfo { type: 'Banks_SetBankInfo' }

const loadFile = async (file:File) => {
    var formData = new FormData();
    formData.append('formFile', file);
    var response = await axios.post('api/File', formData);
    return response.data;
}

export const actionCreators = {
    addBank: () => ({ type: 'Banks_AddBank' } as AddBank),
    setBIK: (index:number, value:string) : AppThunkAction<any>  => (dispatch, getState) => { 
        if(value.length === 9){
            axios.post('api/BankSearch', { bik : value }).then(response => {
                dispatch({  
                    type: 'Banks_SetBankInfo',
                    name:response.data.name,
                    correspondentAccount:response.data.correspondentAccount,
                    bik:value,
                    index:index
                 })
            });
        } else {     
            dispatch({ type: 'Banks_SetBIK', index:index, value:value });
        } 
    },
    fillName:(index:number, bik:string) : AppThunkAction<any>  => (dispatch, getState) => { 
        axios.post('api/BankSearch', { bik : bik }).then(response => {
            dispatch({  
                type: 'Banks_SetName',
                index:index,
                value:response.data.name,
             })
        });
    },
    fillCorrespondentAccount:(index:number, bik:string) : AppThunkAction<any>  => (dispatch, getState) => { 
        axios.post('api/BankSearch', { bik : bik }).then(response => {
            dispatch({  
                type: 'Banks_SetCorrespondentAccount',
                index:index,
                value:response.data.correspondentAccount,
             })
        });
    },
    setName: (index:number, value:string) => ({ type: 'Banks_SetName', index:index, value:value } as SetName),
    setPaymentAccount: (index:number, value:string) => ({ type: 'Banks_SetPaymentAccount', index:index, value:value } as SetPaymentAccount),
    setCorrespondentAccount: (index:number, value:string) => ({ type: 'Banks_SetCorrespondentAccount', index:index, value:value } as SetCorrespondentAccount),
    setShowBanksForm: (value:boolean) => ({ type: 'Banks_SetShowBanksForm', value:value } as SetShowBanksForm),
    upload: () : AppThunkAction<any>  => async (dispatch, getState) => { 
        const state = getState();
        const formOfOwnership = state.formOfOwnership?.Form;
        const banks = state.banksForm?.banks;
        const ip = state.individualEntrepreneur;
        const ooo = state.limitedLiabilityCompany;
        if(formOfOwnership === 'IP' && 
           banks && 
           ip && 
           ip.INNFile && 
           ip.OGRNIPFile && 
           ip.ExtractFromTheEGRIPFile){
            const INNFileId = await loadFile(ip.INNFile);
            const OGRNIPFileId = await loadFile(ip.OGRNIPFile);
            const ExtractFromTheEGRIPFileId = await loadFile(ip.ExtractFromTheEGRIPFile);
            let LeaseAgreementOfThePremisesFileId;
            if(ip.LeaseAgreementOfThePremisesFile){
                LeaseAgreementOfThePremisesFileId = await loadFile(ip.LeaseAgreementOfThePremisesFile);
            }
            const reqest = {
                INNFileId:INNFileId,
                OGRNIPFileId:OGRNIPFileId,
                ExtractFromTheEGRIPFileId:ExtractFromTheEGRIPFileId,
                LeaseAgreementOfThePremisesFileId:LeaseAgreementOfThePremisesFileId,
                INN: ip.INN,
                OGRNIP: ip.OGRNIP,
                DateRegistration: ip.DateRegistration,
                NoСontract: ip.NoСontract,
                Banks: banks
            }

            await axios.post('api/IndividualEntrepreneur', reqest);
        }
        if(formOfOwnership === 'OOO' &&
           banks && 
           ooo && 
           ooo.INNFile && 
           ooo.OGRNFile && 
           ooo.ExtractFromTheEGRIPFile){
            const INNFileId = await loadFile(ooo.INNFile);
            const OGRNIPFileId = await loadFile(ooo.OGRNFile);
            const ExtractFromTheEGRIPFileId = await loadFile(ooo.ExtractFromTheEGRIPFile);
            let LeaseAgreementOfThePremisesFileId;
            if(ooo.LeaseAgreementOfThePremisesFile){
                LeaseAgreementOfThePremisesFileId = await loadFile(ooo.LeaseAgreementOfThePremisesFile);
            }
            const reqest = {
                INNFileId:INNFileId,
                OGRNIPFileId:OGRNIPFileId,
                ExtractFromTheEGRIPFileId:ExtractFromTheEGRIPFileId,
                LeaseAgreementOfThePremisesFileId:LeaseAgreementOfThePremisesFileId,
                FullName: ooo.FullName,
                ShortName: ooo.ShortName,
                DateRegistration: ooo.DateRegistration,
                INN: ooo.INN,
                OGRN: ooo.OGRN,
                NoСontract: ooo.NoСontract,
                Banks: banks
            }
            axios.post('api/LimitedLiabilityCompany', reqest);
        }
    },
};

export const reducer: Reducer<BanksFormState> = 
(state: BanksFormState | undefined, action: any): BanksFormState => {
    if (state === undefined) {
        return { 
            showBanksForm:false,
            banks:[{
                BIK:'',
                Name:'',
                PaymentAccount:'',
                CorrespondentAccount:''
            }]
        };
    }

    switch (action.type) {
        case 'Banks_SetShowBanksForm' : return { ...state, showBanksForm: action.value }
        case 'Banks_AddBank': return { ...state, banks: [...state.banks, {
            BIK:'',
            Name:'',
            PaymentAccount:'',
            CorrespondentAccount:''
        }]};
        case 'Banks_SetBIK': {
            const newState = { ...state, banks: [...state.banks] };
            newState.banks[action.index].BIK = action.value;
            return newState;
        }
        case 'Banks_SetName': {
            const newState = { ...state, banks: [...state.banks] };
            newState.banks[action.index].Name = action.value;
            return newState;
        }
        case 'Banks_SetPaymentAccount': {
            const newState = { ...state, banks: [...state.banks] };
            newState.banks[action.index].PaymentAccount = action.value;
            return newState;
        }
        case 'Banks_SetCorrespondentAccount': {
            const newState = { ...state, banks: [...state.banks] };
            newState.banks[action.index].CorrespondentAccount = action.value;
            return newState;
        }
        case 'Banks_SetBankInfo' : { 
            const newState = { ...state, banks: [...state.banks] };
            newState.banks[action.index].CorrespondentAccount = action.correspondentAccount;
            newState.banks[action.index].Name = action.name;
            newState.banks[action.index].BIK = action.bik;
            return newState;
        }
        default:
            return state;
    }
};