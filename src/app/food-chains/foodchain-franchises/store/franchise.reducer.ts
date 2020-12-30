import { map } from 'rxjs/operators';
import * as FranchiseActions from '../store/franchise.actions';
import { Franchise } from "../franchise.model";
import { act } from '@ngrx/effects';
export interface State {
    franchise: Franchise[];
    loading: boolean;
    error: string | null;
}

const initialState: State = {
    franchise: [],
    loading: false,
    error: null
}

export function franchiseReducer(state = initialState, action: FranchiseActions.FranchiseActions) {
    switch (action.type) {
        case FranchiseActions.LOAD_FRANCHISES:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FranchiseActions.LOAD_FRANCHISES_SUCCESS:
            return {
                ...state,
                franchise: [...action.payload],
                loading: false
            };


        case FranchiseActions.FRANCHISE_DETAIL:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FranchiseActions.FRANCHISE_DETAIL_SUCCESS:
            return {
                ...state,
                franchise: [...state.franchise, action.payload]
            }
        case FranchiseActions.ADD_FRANCHISE:
            return { ...state, loading: true };
        case FranchiseActions.ADD_FRANCHISE_SUCCESS:
            return {
                ...state,
                franchise: [...state.franchise, action.payload],
                loading: false,
                redirect: true
            };
        case FranchiseActions.LOAD_FRANCHISES_FAIL:
        case FranchiseActions.FRANCHISE_DETAIL_FAIL:
        case FranchiseActions.ADD_FRANCHISE_FAILURE:
        case FranchiseActions.UPDATE_FRANCHISE_FAILURE:
        case FranchiseActions.DELETE_FRANCHISE_FAILURE:
            console.log(action.payload);
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case FranchiseActions.UPDATE_FRANCHISE:
        case FranchiseActions.UPDATE_FRANCHISE_SUCCESS:
            const indexUpdate = state.franchise.indexOf(action.payload.newFranchise);
            const oldFoodChain = state.franchise[indexUpdate];

            const updatedFoodChain = {
                ...oldFoodChain,
                ...action.payload
            };

            const updatedFoodChainsList = [...state.franchise];
            updatedFoodChainsList[indexUpdate] = updatedFoodChain;

            return {
                ...state,
                userList: updatedFoodChainsList
            };
        case FranchiseActions.DELETE_FRANCHISE:
            return {
                ...state,
                loading: true
            };
        case FranchiseActions.DELETE_FRANCHISE_SUCCESS:
            return {
                ...state,
                // list: state.franchise.filter(item => item.id !== action.payload),
                loading: false
            }
        default:
            return state;
    }
}