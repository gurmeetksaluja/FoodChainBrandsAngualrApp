import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../auth/store/auth.reducer';
export interface AppState {
  //  shoppingList: fromShoppingList.State;
    auth: fromAuth.State;
 //   recipes:fromRecipes.State;
}

export const appReducer: ActionReducerMap<AppState,any> = {
  //  shoppingList: fromShoppingList.shoppingListReducer,
    auth: fromAuth.authReducer
  //  recipes:fromRecipes.recipeReducer
};