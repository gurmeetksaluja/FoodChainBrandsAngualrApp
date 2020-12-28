import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromApp from '../store/app.reducer';
import { FoodChain } from './food-chain.model';
import { LoadFoodChains } from './store/food-chains.actions';
@Component({
  selector: 'app-food-chains',
  templateUrl: './food-chains.component.html',
  styles: [
  ]
})
export class FoodChainsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  foodChains: FoodChain[];
  loading$: Observable<Boolean>;
  error$: string
  constructor(private store: Store<fromApp.AppState>, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.store.dispatch(new LoadFoodChains());//.select(chain=>chain.foodChains)
    //.pipe(map(foodState => foodState.foodChain))
    // .subscribe(
    //   (foodChain: FoodChain[]) => {
    //     this.foodChains = foodChain;
    //     console.log(this.foodChains);
    //   }
    // );

    // this.store.pipe(select(fromApp.appReducer.foodChains))
    // this.subscription = this.store.select(chain => chain.foodChains)
    //   .pipe(map(foodState => foodState.foodChain))
    //   .subscribe(
    //     (foodChain: FoodChain[]) => {
    //       this.foodChains = foodChain;
    //       console.log(this.foodChains);
    //     }
    //   );
    this.store.dispatch(new LoadFoodChains());
    this.store.select(store => store.foodChains.foodChain).pipe(map(recipesState => recipesState))
      .subscribe(
        (recipe: FoodChain[]) => {
          this.foodChains = recipe;
        }
      );
    this.loading$ = this.store.select(store => store.foodChains.loading);
  }

  onNewFoodChainBrands() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
