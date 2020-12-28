import { Action } from "@ngrx/store";
import { FoodChain } from "../food-chain.model";

export const LOAD_FOOD_CHAINS = '[Food Chain] Load Food Chains';
export const LOAD_FOOD_CHAINS_SUCCESS = '[Food Chain] Load Food Chains Success';
export const LOAD_FOOD_CHAINS_FAIL = '[Food Chain] Load Food Chains Failure';
// export const LOAD_FOOD_CHAIN_BY_ID = '[Food Chain] Load Food Chain By ID';
// export const LOAD_FOOD_CHAIN_BY_ID_SUCCESS = '[Food Chain] Load Food Chain By Id Success';
// export const LOAD_FOOD_CHAIN_BY_ID_FAIL = '[Food Chain] Load Food Chain By Id Failure';
export const FOOD_CHAIN_DETAIL = '[Food Chain] Food Chain Detail';
export const FOOD_CHAIN_DETAIL_SUCCESS = '[Food Chain] Food Chain Detail Success';
export const FOOD_CHAIN_DETAIL_FAIL = '[Food Chain] Food Chain Detail Failure';
export const ADD_FOOD_CHAIN_SUCCESS = '[Food Chain] Add Food Chain Success';
export const ADD_FOOD_CHAIN_FAILURE = '[Food Chain] Add Food Chain Failure';
export const ADD_FOOD_CHAIN = '[Food Chain] Add Food Chain';
export const UPDATE_FOOD_CHAIN_SUCCESS = '[Food Chain] Update Food Chain Success';
export const UPDATE_FOOD_CHAIN_FAILURE = '[Food Chain] Update Food Chain Failure';
export const UPDATE_FOOD_CHAIN = '[Food Chain] Update Food Chain';
export const DELETE_FOOD_CHAIN_SUCCESS = '[Food Chain] Delete Food Chain Success';
export const DELETE_FOOD_CHAIN_FAILURE = '[Food Chain] Delete Food Chain Failure';
export const DELETE_FOOD_CHAIN = '[Food Chain] Delete Food Chain';

export class LoadFoodChains implements Action {
    readonly type = LOAD_FOOD_CHAINS;
}

export class LoadFoodChainsSuccess implements Action {
    readonly type = LOAD_FOOD_CHAINS_SUCCESS;

    constructor(public payload: FoodChain[]) { }
}

export class LoadFoodChainsListFail implements Action {
    readonly type = LOAD_FOOD_CHAINS_FAIL
    constructor(public payload: string) { }

}

export class FoodChainDetail implements Action {
    readonly type = FOOD_CHAIN_DETAIL;

    constructor(public payload: number) { }
}

export class FoodChainDetailSuccess implements Action {
    readonly type = FOOD_CHAIN_DETAIL_SUCCESS;

    constructor(public payload: FoodChain) { }
}


export class FoodChainDetailFailure implements Action {
    readonly type = FOOD_CHAIN_DETAIL_FAIL;

    constructor(public payload: string) { }
}

export class AddFoodChain implements Action {
    readonly type = ADD_FOOD_CHAIN;

    constructor(public payload: FoodChain) { }
}


export class AddFoodChainSuccess implements Action {
    readonly type = ADD_FOOD_CHAIN_SUCCESS

    constructor(public payload: FoodChain) { }
}

export class AddFoodChainFailure implements Action {
    readonly type = ADD_FOOD_CHAIN_FAILURE

    constructor(public payload: string) { }
}

export class UpdateFoodChain implements Action {
    readonly type = UPDATE_FOOD_CHAIN;

    constructor(public payload: { id: number, newFoodChain: FoodChain }) { }
}


export class UpdateFoodChainSuccess implements Action {
    readonly type = UPDATE_FOOD_CHAIN_SUCCESS;

    constructor(public payload: { index: number, newFoodChain: FoodChain }) { }
}


export class UpdateFoodChainFailure implements Action {
    readonly type = UPDATE_FOOD_CHAIN_FAILURE;

    constructor(public payload: string) { }
}

export class DeleteFoodChain implements Action {
    readonly type = DELETE_FOOD_CHAIN;

    constructor(public payload: number) { }
}

export class DeleteFoodChainSuccess implements Action {
    readonly type = DELETE_FOOD_CHAIN_SUCCESS;

    constructor(public payload: number) { }
}

export class DeleteFoodChainFailure implements Action {
    readonly type = DELETE_FOOD_CHAIN_FAILURE;

    constructor(public payload: string) { }
}

export type FoodChainActions = LoadFoodChains | LoadFoodChainsSuccess | LoadFoodChainsListFail | FoodChainDetail | FoodChainDetailSuccess | FoodChainDetailFailure | AddFoodChain | AddFoodChainSuccess | AddFoodChainFailure | UpdateFoodChain | UpdateFoodChainSuccess | UpdateFoodChainFailure | DeleteFoodChain | DeleteFoodChainSuccess | DeleteFoodChainFailure;