import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromFoodChain from '../food-chains/store/food-chains.reducer';
import * as fromFranchise from '../food-chains/foodchain-franchises/store/franchise.reducer';
export interface AppState {
  auth: fromAuth.State;
  foodChains: fromFoodChain.State;
  franchises: fromFranchise.State;
}

export const appReducer: ActionReducerMap<AppState, any> = {
  auth: fromAuth.authReducer,
  foodChains: fromFoodChain.foodChainReducer,
  franchises: fromFranchise.franchiseReducer
};