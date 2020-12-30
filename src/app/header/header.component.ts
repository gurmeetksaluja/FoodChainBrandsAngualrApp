import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as AuthActions from '../auth/store/auth.actions';
import * as fromApp from '../store/app.reducer';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.userSub = this.store.select(store => store.auth).pipe(map(authState => { return authState.userToken; })).subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onLogout() { this.store.dispatch(new AuthActions.Logout()); this.isAuthenticated = false; }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
