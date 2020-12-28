import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoading = false;
  error: string | null = null;
 
  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
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
