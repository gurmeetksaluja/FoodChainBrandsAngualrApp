import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { FoodChain } from "../food-chain.model";

import * as FoodChainActions from './food-chains.actions';
@Injectable()
export class FoodChainAffects {
    @Effect()
    loadFoodChain = this.actions$.pipe(
        ofType(FoodChainActions.LOAD_FOOD_CHAINS),
        mergeMap(() => {
            return this.httpClient.get<FoodChain[]>('http://localhost:5000/api/FoodChain/FoodChains')
        }), map(foodChains => {
            return foodChains.map(foodChains => {
                return {
                    ...foodChains
                };
            });
        }), map(foodChains => {
            return new FoodChainActions.LoadFoodChainsSuccess(foodChains)
        })
    );

    @Effect()
    loadSpecificFoodChain = this.actions$.pipe(
        ofType(FoodChainActions.FOOD_CHAIN_DETAIL),
        mergeMap((data: FoodChainActions.FoodChainDetail) => {
            return this.httpClient.get<FoodChain>('http://localhost:5000/api/FoodChain/FoodChainDetail?id='+data.payload)
        }), map(foodChain => {
            return new FoodChainActions.FoodChainDetailSuccess(foodChain),
            catchError(error => of(new FoodChainActions.FoodChainDetailFailure(error.message)))
        })
    );

    @Effect()
    AddFoodChain = this.actions$.pipe(
        ofType(FoodChainActions.ADD_FOOD_CHAIN),
        mergeMap((data: FoodChainActions.AddFoodChain) => {
            console.log(data.payload)
            return this.httpClient.post<FoodChain>('http://localhost:5000/api/FoodChain/AddFoodChain', data.payload).pipe(
                map(() => new FoodChainActions.AddFoodChainSuccess(data.payload)),
                catchError(error => of(new FoodChainActions.AddFoodChainFailure(error.message)))
            )
        })
    );


    @Effect({ dispatch: false })
    addRedirect = this.actions$.pipe(
      ofType(FoodChainActions.ADD_FOOD_CHAIN_SUCCESS),
      tap((authSuccessAction: FoodChainActions.AddFoodChainSuccess) => {        
          this.router.navigate(['/foodchains']);        
      })
    );

 
    @Effect()
    UpdateFoodChain = this.actions$.pipe(
        ofType(FoodChainActions.UPDATE_FOOD_CHAIN),
        mergeMap((data: FoodChainActions.UpdateFoodChain) => {
            return this.httpClient.put<FoodChain>('http://localhost:5000/api/FoodChain/UpdateFoodChain?id=' + data.payload.id, data.payload.newFoodChain).pipe(
                map(() => new FoodChainActions.UpdateFoodChainSuccess({ index: data.payload.id, newFoodChain: data.payload.newFoodChain })),
                catchError(error => of(new FoodChainActions.UpdateFoodChainFailure(error.message)))
            )
        })
    );

    @Effect({ dispatch: false })
    updateRedirect = this.actions$.pipe(
      ofType(FoodChainActions.UPDATE_FOOD_CHAIN_SUCCESS),
      tap((authSuccessAction: FoodChainActions.UpdateFoodChainSuccess) => {        
          this.router.navigate(['/foodchains']);        
      })
    );
  
    @Effect()
    DeleteFoodChain = this.actions$.pipe(
        ofType(FoodChainActions.DELETE_FOOD_CHAIN),
        switchMap((data: FoodChainActions.DeleteFoodChain) => {
            return this.httpClient.delete<FoodChain>('http://localhost:5000/api/FoodChain/RemoveFoodChain?id=' + data.payload).pipe(
                map(() => new FoodChainActions.DeleteFoodChainSuccess(data.payload)),
                catchError(error => of(new FoodChainActions.DeleteFoodChainFailure(error.message)))
            )
        })
    );
  
    constructor(private actions$: Actions,
        private httpClient: HttpClient,
        private router: Router) { }
}