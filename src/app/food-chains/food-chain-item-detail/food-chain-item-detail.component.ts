import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { FoodChain } from '../food-chain.model';
import * as FoodChainActions from '../store/food-chains.actions';
import * as fromApp from '../../store/app.reducer';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-food-chain-item-detail',
  templateUrl: './food-chain-item-detail.component.html',
  styles: [
  ]
})
export class FoodChainItemDetailComponent implements OnInit {
  foodChainItem: FoodChain;
  id: number;
  private storeSub: Subscription;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.getDetail();
    });
  }

  private getDetail() {
    this.store.dispatch(new FoodChainActions.LoadFoodChains());
    this.storeSub = this.store.select(foodChains => foodChains.foodChains).pipe(map(foodState => {
      return foodState.foodChain.find((foodChain, index) => {
        return foodChain.id === this.id;
      });
    })).subscribe(foodChain => {
      this.foodChainItem = foodChain!;
    });
  }

  onEditFoodChain() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  onCancelFoodChainManage() { this.router.navigate(['/foodchains'], { relativeTo: this.route }); }

  onDeleteFoodChain(){
    this.store.dispatch(new FoodChainActions.DeleteFoodChain(this.id));
    this.router.navigate(['/foodchains'], { relativeTo: this.route }); 
  }
}
