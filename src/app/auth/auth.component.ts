import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoading = false; private userSub: Subscription;
  error: string | null = null;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.userSub = this.store.select(store => store.auth).pipe(map(authState => { return authState; })).subscribe(user => {
      // this.isAuthenticated = !!user;
      this.error = user.authError;
      if (this.error) {
        alert(this.error);
      }
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const username = form.value.username;
    const password = form.value.password;

    this.store.dispatch(new AuthActions.LoginStart(
      {
        username: username,
        password: password
      })
    );

    form.reset();
  }
}

