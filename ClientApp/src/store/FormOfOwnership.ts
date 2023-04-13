import { Reducer } from 'redux';


export interface FormOfOwnershipState {
    Form: string|undefined;
}

export interface SetFormOfOwnership { type: 'SetFormOfOwnership' }

export const actionCreators = {
    setFormOfOwnership: (value: string) => ({ type: 'SetFormOfOwnership', value:value } as SetFormOfOwnership),
};

export const reducer: Reducer<FormOfOwnershipState> = 
(state: FormOfOwnershipState | undefined, action: any): FormOfOwnershipState => {
    if (state === undefined) {
        return { 
            Form:'IP'
        };
    }

    switch (action.type) {
        case 'SetFormOfOwnership': return { ...state, Form: action.value};
        default:
            return state;
    }
};