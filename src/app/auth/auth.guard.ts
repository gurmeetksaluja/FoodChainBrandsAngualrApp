import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import * as fromApp from '../store/app.reducer';

@Injectable(
    { providedIn: 'root' }
)
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private store: Store<fromApp.AppState>) { }
    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | UrlTree
        | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        return this.store.select('auth').pipe(take(1),
            map(authState => {
                return authState.userToken;
            }), map(
                user => {
                    const isAUth = !!user;
                    if (isAUth) {
                        return true;
                    }
                    return this.router.createUrlTree(['/']);
                }
            ));
    }

}