import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromFoodChain from '../food-chains/store/food-chains.reducer';
export interface AppState {
  //  shoppingList: fromShoppingList.State;
    auth: fromAuth.State;
   foodChains:fromFoodChain.State;
}

export const appReducer: ActionReducerMap<AppState,any> = {
  //  shoppingList: fromShoppingList.shoppingListReducer,
    auth: fromAuth.authReducer,
    foodChains:fromFoodChain.foodChainReducer
  //  recipes:fromRecipes.recipeReducer
};