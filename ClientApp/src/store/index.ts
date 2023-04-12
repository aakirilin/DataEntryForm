import * as IndividualEntrepreneur from './IndividualEntrepreneur';
import * as LimitedLiabilityCompany from './LimitedLiabilityCompany';
import * as FormOfOwnership from './FormOfOwnership';

// The top-level state object
export interface ApplicationState {
    individualEntrepreneur:IndividualEntrepreneur.IndividualEntrepreneurState | undefined;
    limitedLiabilityCompany:LimitedLiabilityCompany.LimitedLiabilityCompanyState | undefined;
    formOfOwnership:FormOfOwnership.FormOfOwnershipState | undefined;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    individualEntrepreneur:IndividualEntrepreneur.reducer,
    limitedLiabilityCompany:LimitedLiabilityCompany.reducer,
    formOfOwnership:FormOfOwnership.reducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
