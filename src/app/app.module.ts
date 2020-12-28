import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { environment } from 'src/environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FoodChainsComponent } from './food-chains/food-chains.component';
import { FoodChainInterceptorService } from '../../src/app/food-chains/food-chain-interceptor.service';
import { FoodChainAffects } from './food-chains/store/food-chains.effects';
import { FoodChainDetailComponent } from './food-chains/food-chain-detail/food-chain-detail.component';
import { FoodChainItemDetailComponent } from './food-chains/food-chain-item-detail/food-chain-item-detail.component';
import { FoodChainAddEditComponent } from './food-chains/food-chain-add-edit/food-chain-add-edit.component';
import { AppRoutingModule } from './app-routing.module';
import { Page404Component } from './page404/page404.component';

// const appRoutes: Routes = [
//   { path: '', redirectTo: '/auth', pathMatch: 'full' },
//   { path: 'auth', component: AuthComponent },
//   {
//     path: 'foodchains', component: FoodChainsComponent
//   },
//   { path: 'foodchains/:id', component: FoodChainDetailComponent },
//   // , children: [
//   //   {
//   //     path: ':id',
//   //     component: FoodChainItemDetailComponent//,
//   //     //  resolve: [RecipesResolverService]
//   //   },
//   //   { path: 'new', component: FoodChainAddEditComponent},
//   // ]
//   { path: 'new', component: FoodChainAddEditComponent },
//     { path: ':id', component: FoodChainAddEditComponent },
// ]
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    FoodChainsComponent,
    FoodChainDetailComponent,
    FoodChainItemDetailComponent,
    FoodChainAddEditComponent,
    Page404Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,  //, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' }
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, FoodChainAffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FoodChainInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
