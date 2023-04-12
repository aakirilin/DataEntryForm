import { Reducer } from 'redux';
import axios from 'axios';
import { AppThunkAction } from './';


export interface LimitedLiabilityCompanyState {
    FullName: string|undefined;
    ShortName: string|undefined;
    DateRegistration:Date|null;
    INN: string|undefined;
    INNFile : File|undefined;
    OGRN:string|undefined;
    OGRNFile:File|undefined;
    ExtractFromTheEGRIPFile:File|undefined;
    LeaseAgreementOfThePremisesFile:File|undefined;
    NoСontract:boolean;
}


export interface SetFullName { type: 'OOO_SetFullName' }
export interface SetShortName { type: 'OOO_SetShortName' }
export interface SetDateRegistration { type: 'OOO_SetDateRegistration' }
export interface SetINN { type: 'OOO_SetINN' }
export interface SetINNFile { type: 'OOO_SetINNFile' }
export interface SetOGRN { type: 'OOO_SetOGRN' }
export interface SetOGRNIPFile { type: 'OOO_SetOGRNFile' }
export interface SetExtractFromTheEGRIPFile { type: 'OOO_SetExtractFromTheEGRIPFile' }
export interface SetLeaseAgreementOfThePremisesFile { type: 'OOO_SetLeaseAgreementOfThePremisesFile' }
export interface SetNoСontract { type: 'OOO_SetNoСontract' }
export interface SetOrganization { type: 'OOO_SetOrganization' }

type KnownAction = SetFullName | 
                   SetShortName | 
                   SetDateRegistration | 
                   SetINN | 
                   SetINNFile | 
                   SetOGRN | 
                   SetOGRNIPFile | 
                   SetExtractFromTheEGRIPFile | 
                   SetLeaseAgreementOfThePremisesFile | 
                   SetNoСontract | 
                   SetOrganization;
               
interface OOOData{
    dateRegistration: Date|null,
    fullName:string,
    ogrn:string,
    shortName:string
}

export const actionCreators = {
    setFullName: (value: string) => ({ type: 'OOO_SetFullName', value:value } as SetFullName),
    setShortName: (value: string) => ({ type: 'OOO_SetShortName', value:value } as SetShortName),
    setDateRegistration: (value:Date|null) => ({ type: 'OOO_SetDateRegistration',value:value } as SetDateRegistration),
    setINN: (value: string) : AppThunkAction<any>  => (dispatch, getState) => {
        if(value.length === 10) {
            axios.post('api/OOOSearch', { INN : value}).then(response => {
                dispatch({ 
                    type: 'OOO_SetOrganization',
                    dateRegistration:response.data.dateRegistration,
                    fullName:response.data.fullName,
                    ogrn:response.data.ogrn,
                    shortName:response.data.shortName,
                    inn:value
                 })
            });
        }
        else {
            return { type: 'OOO_SetINN', value:value } as SetINN;
        }
    },
    setINNFile: (file:File) => ({ type: 'OOO_SetINNFile', file:file} as SetINNFile),
    setOGRN: (value: string) => ({ type: 'OOO_SetOGRN', value:value } as SetOGRN),
    setOGRNFile: (file:File) => ({ type: 'OOO_SetOGRNFile',file:file } as SetOGRNIPFile),
    setExtractFromTheEGRIPFile: (file:File) => ({ type: 'OOO_SetExtractFromTheEGRIPFile',file:file } as SetExtractFromTheEGRIPFile),
    setLeaseAgreementOfThePremisesFile: (file:File) => ({ type: 'OOO_SetLeaseAgreementOfThePremisesFile',file:file } as SetLeaseAgreementOfThePremisesFile),
    setNoСontract: (value: boolean) => ({ type: 'OOO_SetNoСontract', value:value } as SetNoСontract),
};

export const reducer: Reducer<LimitedLiabilityCompanyState> = 
(state: LimitedLiabilityCompanyState | undefined, action: any): LimitedLiabilityCompanyState => {
    if (state === undefined) {
        return { 
            FullName: '',
            ShortName: '',
            DateRegistration: null,
            INN: '',
            INNFile : undefined,
            OGRN:'',
            OGRNFile:undefined,
            ExtractFromTheEGRIPFile:undefined,
            LeaseAgreementOfThePremisesFile:undefined,
            NoСontract:false
        };
    }

    switch (action.type) {
        case 'OOO_SetFullName': return { ...state, FullName: action.value};
        case 'OOO_SetShortName': return { ...state, ShortName: action.value};
        case 'OOO_SetDateRegistration': return { ...state, DateRegistration: action.value};
        case 'OOO_SetINN': return { ...state, INN: action.value};
        case 'OOO_SetINNFile': return { ...state, INNFile: action.file};
        case 'OOO_SetOGRN': return { ...state, OGRN: action.value};
        case 'OOO_SetOGRNFile': return { ...state, OGRNFile: action.file};
        case 'OOO_SetExtractFromTheEGRIPFile': return { ...state, ExtractFromTheEGRIPFile: action.file};
        case 'OOO_SetLeaseAgreementOfThePremisesFile': return { ...state, LeaseAgreementOfThePremisesFile: action.file};
        case 'OOO_SetNoСontract': return { ...state, NoСontract: action.value};
        case 'OOO_SetOrganization': return { ...state, 
            FullName: action.fullName,
            ShortName: action.shortName,
            DateRegistration: new Date(action.dateRegistration),
            INN: action.inn,
            OGRN: action.ogrn,
        };
        
        default:
            return state;
    }
};