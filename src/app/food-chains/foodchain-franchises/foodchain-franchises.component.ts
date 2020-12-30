import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Franchise } from './franchise.model';
import * as fromApp from '../../store/app.reducer';
import { LoadFranchises } from './store/franchise.actions';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-foodchain-franchises',
  templateUrl: './foodchain-franchises.component.html',
  styles: [
  ]
})
export class FoodchainFranchisesComponent implements OnInit, OnDestroy {
  id: number;
  subscription: Subscription;
  franchises: Franchise[];
  loading$: Observable<Boolean>;
  error$: string
  constructor(private store: Store<fromApp.AppState>, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
    });

    this.store.dispatch(new LoadFranchises(this.id));
    this.store.select(store => store.franchises.franchise).pipe(map(recipesState => recipesState))
      .subscribe(
        (franchises: Franchise[]) => {
          this.franchises = franchises;
        
        }
      );
    this.loading$ = this.store.select(store => store.franchises.loading);
  }

  onNewFranchises() {
    this.router.navigate(['manage'], { relativeTo: this.route });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
