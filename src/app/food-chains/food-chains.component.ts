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
    
    this.store.dispatch(new LoadFoodChains());
    this.store.select(store => store.foodChains.foodChain).pipe(map(recipesState => recipesState))
      .subscribe(
        (recipe: FoodChain[]) => {
          this.foodChains = recipe;
          console.log('FoodCHains',this.foodChains);
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
