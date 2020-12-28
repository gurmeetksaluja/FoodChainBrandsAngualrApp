import { FoodChain } from "../food-chain.model";
import { map } from 'rxjs/operators';
import * as FoodChainActions from '../store/food-chains.actions';
export interface State {
    foodChain: FoodChain[];
    loading: boolean;
    error: string | null;
}

const initialState: State = {
    foodChain: [],
    loading: false,
    error: null
}

export function foodChainReducer(state = initialState, action: FoodChainActions.FoodChainActions) {
    switch (action.type) {
        case FoodChainActions.LOAD_FOOD_CHAINS:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FoodChainActions.LOAD_FOOD_CHAINS_SUCCESS:
            return {
                ...state,
                foodChain: [...action.payload],
                loading: false
            };

        case FoodChainActions.LOAD_FOOD_CHAINS_FAIL:

        case FoodChainActions.FOOD_CHAIN_DETAIL_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case FoodChainActions.FOOD_CHAIN_DETAIL:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FoodChainActions.FOOD_CHAIN_DETAIL_SUCCESS:
            return {
                ...state,
                foodChain: [...state.foodChain, action.payload]
            }
        case FoodChainActions.ADD_FOOD_CHAIN:
            return { ...state, loading: true };
        case FoodChainActions.ADD_FOOD_CHAIN_SUCCESS:
            return {
                ...state,
                foodChain: [...state.foodChain, action.payload],
                loading: false,
                redirect: true
            };
        case FoodChainActions.ADD_FOOD_CHAIN_FAILURE:
        case FoodChainActions.UPDATE_FOOD_CHAIN_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        case FoodChainActions.UPDATE_FOOD_CHAIN:
        case FoodChainActions.UPDATE_FOOD_CHAIN_SUCCESS:
            const indexUpdate = state.foodChain.indexOf(action.payload.newFoodChain);
            const oldFoodChain = state.foodChain[indexUpdate];

            const updatedFoodChain = {
                ...oldFoodChain,
                ...action.payload
            };

            const updatedFoodChainsList = [...state.foodChain];
            updatedFoodChainsList[indexUpdate] = updatedFoodChain;

            return {
                ...state,
                userList: updatedFoodChainsList
            };



        case FoodChainActions.DELETE_FOOD_CHAIN:
        case FoodChainActions.DELETE_FOOD_CHAIN_SUCCESS:
        case FoodChainActions.DELETE_FOOD_CHAIN_FAILURE:
            return state;
        default:
            return state;
    }
}