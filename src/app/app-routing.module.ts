import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { FoodChainAddEditComponent } from "./food-chains/food-chain-add-edit/food-chain-add-edit.component";
import { FoodChainItemDetailComponent } from "./food-chains/food-chain-item-detail/food-chain-item-detail.component";
import { FoodChainsComponent } from "./food-chains/food-chains.component";
import { FoodchainFranchisesComponent } from "./food-chains/foodchain-franchises/foodchain-franchises.component";
import { FranchiseAddEditComponent } from "./food-chains/foodchain-franchises/franchise-add-edit/franchise-add-edit.component";
import { Page404Component } from "./page404/page404.component";


const appRoutes: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    { path: 'auth', component: AuthComponent },
    {
        path: 'foodchains', children: [
            { path: '', component: FoodChainsComponent },
            { path: 'new', component: FoodChainAddEditComponent },
            { path: ':id', component: FoodChainItemDetailComponent },
            { path: ':id/edit', component: FoodChainAddEditComponent },
            {
                path: ':id/franchise', children: [
                    { path: '', component: FoodchainFranchisesComponent },
                    { path: 'manage', component: FranchiseAddEditComponent }
                ]
            }
        ]
    },
    { path: '**', component: Page404Component }
]
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}