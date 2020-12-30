import { Action } from "@ngrx/store";
import { Franchise } from "../franchise.model";

export const LOAD_FRANCHISES = '[Food Chain Franchise] Load Franchises';
export const LOAD_FRANCHISES_SUCCESS = '[Food Chain Franchise] Load Franchises Success';
export const LOAD_FRANCHISES_FAIL = '[Food Chain Franchise] Load Franchise Failure';
export const FRANCHISE_DETAIL = '[Food Chain Franchise] Franchise Detail';
export const FRANCHISE_DETAIL_SUCCESS = '[Food Chain Franchise] Franchise Detail Success';
export const FRANCHISE_DETAIL_FAIL = '[Food Chain Franchise] Franchise Detail Failure';
export const ADD_FRANCHISE_SUCCESS = '[Food Chain Franchise] Add Franchise Success';
export const ADD_FRANCHISE_FAILURE = '[Food Chain Franchise] Add Franchise Failure';
export const ADD_FRANCHISE = '[Food Chain Franchise] Add Franchise';
export const UPDATE_FRANCHISE_SUCCESS = '[Food Chain Franchise] Update Franchise Success';
export const UPDATE_FRANCHISE_FAILURE = '[Food Chain Franchise] Update Franchise Failure';
export const UPDATE_FRANCHISE = '[Food Chain Franchise] Update Franchise';
export const DELETE_FRANCHISE_SUCCESS = '[Food Chain Franchise] Delete Franchise Success';
export const DELETE_FRANCHISE_FAILURE = '[Food Chain Franchise] Delete Franchise Failure';
export const DELETE_FRANCHISE = '[Food Chain Franchise] Delete Franchise';

export class LoadFranchises implements Action {
    readonly type = LOAD_FRANCHISES;
    constructor(public payload: number) { }
}

export class LoadFranchisesSuccess implements Action {
    readonly type = LOAD_FRANCHISES_SUCCESS;

    constructor(public payload: Franchise[]) { }
}

export class LoadFranchisesListFail implements Action {
    readonly type = LOAD_FRANCHISES_FAIL;
    constructor(public payload: string) { }

}

export class FranchiseDetail implements Action {
    readonly type = FRANCHISE_DETAIL;

    constructor(public payload: number) { }
}

export class FranchiseDetailSuccess implements Action {
    readonly type = FRANCHISE_DETAIL_SUCCESS;

    constructor(public payload: Franchise) { }
}


export class FranchiseDetailFailure implements Action {
    readonly type = FRANCHISE_DETAIL_FAIL;

    constructor(public payload: string) { }
}

export class AddFranchise implements Action {
    readonly type = ADD_FRANCHISE;

    constructor(public payload: any) { }
}


export class AddFranchiseSuccess implements Action {
    readonly type = ADD_FRANCHISE_SUCCESS;

    constructor(public payload: any) { }
}

export class AddFranchiseFailure implements Action {
    readonly type = ADD_FRANCHISE_FAILURE

    constructor(public payload: string) { }
}

export class UpdateFranchise implements Action {
    readonly type = UPDATE_FRANCHISE;

    constructor(public payload: { id: number, newFranchise: Franchise }) { }
}


export class UpdateFranchiseSuccess implements Action {
    readonly type = UPDATE_FRANCHISE_SUCCESS;

    constructor(public payload: { index: number, newFranchise: Franchise }) { }
}


export class UpdateFranchiseFailure implements Action {
    readonly type = UPDATE_FRANCHISE_FAILURE;

    constructor(public payload: string) { }
}

export class DeleteFranchise implements Action {
    readonly type = DELETE_FRANCHISE;

    constructor(public payload: number) { }
}

export class DeleteFranchiseSuccess implements Action {
    readonly type = DELETE_FRANCHISE_SUCCESS;

    constructor(public payload: number) { }
}

export class DeleteFranchiseFailure implements Action {
    readonly type = DELETE_FRANCHISE_FAILURE;

    constructor(public payload: string) { }
}

export type FranchiseActions = LoadFranchises | LoadFranchisesSuccess | LoadFranchisesListFail | FranchiseDetail | FranchiseDetailSuccess | FranchiseDetailFailure | AddFranchise | AddFranchiseSuccess | AddFranchiseFailure | UpdateFranchise | UpdateFranchiseSuccess | UpdateFranchiseFailure | DeleteFranchise | DeleteFranchiseSuccess | DeleteFranchiseFailure;