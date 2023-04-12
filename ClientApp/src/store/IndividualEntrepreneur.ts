import { Reducer } from 'redux';

export interface IndividualEntrepreneurState {
    INN: string|undefined;
    INNFile : File|undefined;
    OGRNIP:string|undefined;
    OGRNIPFile:File|undefined;
    DateRegistration:Date|null;
    ExtractFromTheEGRIPFile:File|undefined;
    LeaseAgreementOfThePremisesFile:File|undefined;
    NoСontract:boolean;
}

export interface SetINN { type: 'IP_SetINN' }
export interface SetINNFile { type: 'IP_SetINNFile' }
export interface SetOGRNIP { type: 'IP_SetOGRNIP' }
export interface SetOGRNIPFile { type: 'IP_SetOGRNIPFile' }
export interface SetDateRegistration { type: 'IP_SetDateRegistration' }
export interface SetExtractFromTheEGRIPFile { type: 'IP_SetExtractFromTheEGRIPFile' }
export interface SetLeaseAgreementOfThePremisesFile { type: 'IP_SetLeaseAgreementOfThePremisesFile' }
export interface SetNoСontract { type: 'IP_SetNoСontract' }

export const actionCreators = {
    setINN: (value: string) => ({ type: 'IP_SetINN', value:value } as SetINN),
    setINNFile: (file:File) => ({ type: 'IP_SetINNFile', file:file} as SetINNFile),
    setOGRNIP: (value: string) => ({ type: 'IP_SetOGRNIP', value:value } as SetOGRNIP),
    setOGRNIPFile: (file:File) => ({ type: 'IP_SetOGRNIPFile',file:file } as SetOGRNIPFile),
    setDateRegistration: (value:Date|null) => ({ type: 'IP_SetDateRegistration',value:value } as SetDateRegistration),
    setExtractFromTheEGRIPFile: (file:File) => ({ type: 'IP_SetExtractFromTheEGRIPFile',file:file } as SetExtractFromTheEGRIPFile),
    setLeaseAgreementOfThePremisesFile: (file:File) => ({ type: 'IP_SetLeaseAgreementOfThePremisesFile',file:file } as SetLeaseAgreementOfThePremisesFile),
    setNoСontract: (value: boolean) => ({ type: 'IP_SetNoСontract', value:value } as SetNoСontract),
};

export const reducer: Reducer<IndividualEntrepreneurState> = 
(state: IndividualEntrepreneurState | undefined, action: any): IndividualEntrepreneurState => {
    if (state === undefined) {
        return { 
            INN: undefined,
            INNFile : undefined,
            OGRNIP:undefined,
            OGRNIPFile:undefined,
            DateRegistration:null,
            ExtractFromTheEGRIPFile:undefined,
            LeaseAgreementOfThePremisesFile:undefined,
            NoСontract:false
        };
    }

    switch (action.type) {
        case 'IP_SetINN': return { ...state, INN: action.value};
        case 'IP_SetINNFile': return { ...state, INNFile: action.file};
        case 'IP_SetOGRNIP': return { ...state, OGRNIP: action.value};
        case 'IP_SetOGRNIPFile': return { ...state, OGRNIPFile: action.file};
        case 'IP_SetDateRegistration': return { ...state, DateRegistration: action.value};
        case 'IP_SetExtractFromTheEGRIPFile': return { ...state, ExtractFromTheEGRIPFile: action.file};
        case 'IP_SetLeaseAgreementOfThePremisesFile': return { ...state, LeaseAgreementOfThePremisesFile: action.file};
        case 'IP_SetNoСontract': return { ...state, NoСontract: action.value};
        
        default:
            return state;
    }
};