import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Injectable()
export class FoodChainInterceptorService implements HttpInterceptor{
    intercept(req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {

 
  const userData: {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expirationDate: Date;
  } = JSON.parse(localStorage.getItem('userData')!);
  if (userData) {
  //  console.log(userData.access_token);
    const  idToken=userData.access_token;
      const cloned = req.clone({
          headers: req.headers.set("Authorization",
              "Bearer " + idToken)
      });

      return next.handle(cloned);
  }
  else {
      return next.handle(req);
  }
}

}