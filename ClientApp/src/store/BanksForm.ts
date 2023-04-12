import { Reducer } from 'redux';

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

export const actionCreators = {
    addBank: () => ({ type: 'Banks_AddBank' } as AddBank),
    setBIK: (index:number, value:string) => ({ type: 'Banks_SetBIK', index:index, value:value } as SetBIK),
    setName: (index:number, value:string) => ({ type: 'Banks_SetName', index:index, value:value } as SetName),
    setPaymentAccount: (index:number, value:string) => ({ type: 'Banks_SetPaymentAccount', index:index, value:value } as SetPaymentAccount),
    setCorrespondentAccount: (index:number, value:string) => ({ type: 'Banks_SetCorrespondentAccount', index:index, value:value } as SetCorrespondentAccount),
    setShowBanksForm: (value:boolean) => ({ type: 'Banks_SetShowBanksForm', value:value } as SetShowBanksForm),
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
        default:
            return state;
    }
};