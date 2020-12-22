import { Actions, Effect, ofType } from "@ngrx/effects";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import * as AuthActions from './auth.actions';
import { AuthService } from "../auth.service";
import { of } from "rxjs";
import { User } from "../user.model";
import { Injectable } from "@angular/core";
export interface AuthResponseData {
  access_token: string;
  expires_in: number;
  token_type: string;
  refresh_token: string;
  scope: string;
}

const handleAuthentication = (
  access_token: string,
  expires_in: number,
  token_type: string,
  refresh_token: string
) => {
  const expirationDate = new Date(new Date().getTime() + expires_in * 1000);
  const user = new User(access_token, token_type, refresh_token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess({
    access_token: access_token,
    token_type: token_type,
    refresh_token: refresh_token,
    expirationDate: expirationDate,
    redirect: true
  });
};

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred!';
  console.log(errorRes);
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.';
      break;
  }
  return of(new AuthActions.AuthenticateFail(errorMessage));
};


@Injectable()
export class AuthEffects {
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      var headersForTokenAPI = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
      var dataToken = "grant_type=password&username=" + authData.payload.username + "&password=" + authData.payload.password +
        "&scope=openid offline_access&client_id=ro.angular&client_secret=secret";
      return this.httpClient.post<AuthResponseData>('http://localhost:5000/connect/token',
        dataToken, { headers: headersForTokenAPI }).pipe(
          tap(resData => {
            this.authService.setLogoutTimer(+resData.expires_in * 1000);
          }),
          map(resData => {
            return handleAuthentication(
              resData.access_token,
              resData.expires_in,
              resData.token_type,
              resData.refresh_token
            );
          }),
          catchError(errorRes => {
            return handleError(errorRes);
          })
        );
    })

  );

  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
      if (authSuccessAction.payload.redirect) {
        this.router.navigate(['/foodchains']);
      }
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.authService.clearLogoutTimer();
      localStorage.removeItem('userData');
      this.router.navigate(['/auth']);
    })
  );

  constructor(private actions$: Actions,
    private httpClient: HttpClient,
    private router: Router, private authService: AuthService) { }
}