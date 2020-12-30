import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { Franchise } from "../franchise.model";

import * as FranchiseActions from './franchise.actions';
@Injectable()
export class FranchiseAffects {
    @Effect()
    loadFranchises = this.actions$.pipe(
        ofType(FranchiseActions.LOAD_FRANCHISES),
        mergeMap((data: FranchiseActions.LoadFranchises) => {
            console.log('Call Load',data.payload);
            return this.httpClient.get<Franchise[]>('http://localhost:5000/api/FoodChainFranchise/FoodChainFranchises?id=' + data.payload)
        }), map(franchises => {
            return franchises.map(franchises => {
                return {
                    ...franchises
                };
            });
        }), map(franchises => {
            return new FranchiseActions.LoadFranchisesSuccess(franchises)
        })
    );

    @Effect()
    loadSpecificFranchise = this.actions$.pipe(
        ofType(FranchiseActions.FRANCHISE_DETAIL),
        mergeMap((data: FranchiseActions.FranchiseDetail) => {
            return this.httpClient.get<Franchise>('http://localhost:5000/api​/FoodChainFranchise​/FoodChainFranchiseDetail?id=' + data.payload)
        }), map(franchise => {
            return new FranchiseActions.FranchiseDetailSuccess(franchise),
                catchError(error => of(new FranchiseActions.FranchiseDetailFailure(error.message)))
        })
    );

    @Effect()
    AddFranchise = this.actions$.pipe(
        ofType(FranchiseActions.ADD_FRANCHISE),
        mergeMap((data: FranchiseActions.AddFranchise) => {
            console.log(data.payload)
            return this.httpClient.post<Franchise[]>('http://localhost:5000/api/FoodChainFranchise/AddUpdateFoodChainFranchises', data.payload).pipe(
                map(() => new FranchiseActions.AddFranchiseSuccess(data.payload)),
                catchError(error => of(new FranchiseActions.AddFranchiseFailure(error.message)))
            )
        })
    );


    @Effect({ dispatch: false })
    addRedirect = this.actions$.pipe(
        ofType(FranchiseActions.ADD_FRANCHISE_SUCCESS),
        tap((authSuccessAction: FranchiseActions.AddFranchiseSuccess) => {
          //  this.router.navigate(['../../franchise']);
        })
    );


    @Effect()
    UpdateFranchise = this.actions$.pipe(
        ofType(FranchiseActions.UPDATE_FRANCHISE),
        mergeMap((data: FranchiseActions.UpdateFranchise) => {
            return this.httpClient.put<Franchise>('http://localhost:5000/api/FoodChainFranchise/UpdateFoodChainFranchises?id=' + data.payload.id, data.payload.newFranchise).pipe(
                map(() => new FranchiseActions.UpdateFranchiseSuccess({ index: data.payload.id, newFranchise: data.payload.newFranchise })),
                catchError(error => of(new FranchiseActions.UpdateFranchiseFailure(error.message)))
            )
        })
    );

    @Effect({ dispatch: false })
    updateRedirect = this.actions$.pipe(
        ofType(FranchiseActions.UPDATE_FRANCHISE_SUCCESS),
        tap((authSuccessAction: FranchiseActions.UpdateFranchiseSuccess) => {
         
        })
    );
  
    @Effect({dispatch:false})
    DeleteFranchise = this.actions$.pipe(
        ofType(FranchiseActions.DELETE_FRANCHISE),
        mergeMap((data: FranchiseActions.DeleteFranchise) => {
            console.log('Delete Call',data.payload);
            return this.httpClient.delete<Franchise>('http://localhost:5000/api/FoodChainFranchise/RemoveFoodChainFranchise?id=' + data.payload).pipe(
                map(() => {new FranchiseActions.DeleteFranchiseSuccess(data.payload)}),
                catchError(error => of(new FranchiseActions.DeleteFranchiseFailure(error.message)))
            )
        })
    );

    constructor(private actions$: Actions,
        private httpClient: HttpClient,
        private router: Router,private route: ActivatedRoute) { }
}