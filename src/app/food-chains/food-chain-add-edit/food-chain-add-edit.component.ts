import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as FoodChainActions from '../store/food-chains.actions';

import * as fromApp from '../../store/app.reducer';
@Component({
  selector: 'app-food-chain-add-edit',
  templateUrl: './food-chain-add-edit.component.html',
  styles: [
  ]
})
export class FoodChainAddEditComponent implements OnInit {
  id: number;
  editMode = false;
  foodChainForm: FormGroup;
  private storeSub: Subscription;
  fileToUpload: File;
  url: string = '';
  private data: any = []
  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
    console.log('editmode', this.editMode);
  }


  private initForm() {
    let foodChainName = '';
    let foodChainImagePath = '';
    let foodChainDescription = '';
    //let recipeIngredients = new FormArray([]);
    let foodChainId = 0;
    if (this.editMode) {
      // const recipe = this.recipeService.getRecipe(this.id);
      this.store.dispatch(new FoodChainActions.LoadFoodChains());
      this.storeSub = this.store.select(foodChains => foodChains.foodChains).pipe(map(foodState => {
        return foodState.foodChain.find((foodChain, index) => {
          return foodChain.id === this.id;
        });
      })).subscribe(foodChain => {
        foodChainName = foodChain?.foodChainName!;
        foodChainId = foodChain?.id!;
        foodChainImagePath = foodChain?.foodChainLogoURL!;
        foodChainDescription = foodChain?.description!;

        this.foodChainForm = new FormGroup(
          {
            'id': new FormControl(foodChainId),
            'foodChainName': new FormControl(foodChainName, Validators.required),
            'foodChainLogoURL': new FormControl(foodChainImagePath, Validators.required),
            'description': new FormControl(foodChainDescription, Validators.required),
            //  'ingredients': recipeIngredients
          }
        );
        // if (recipe['ingredients']) {
        //   for (let ingredient of recipe.ingredients) {
        //     recipeIngredients.push(
        //       new FormGroup({
        //         'name': new FormControl(ingredient.name, Validators.required),
        //         'amount': new FormControl(ingredient.amount, [Validators.required,
        //         Validators.pattern(/^[1-9]+[0-9]*$/)
        //         ])
        //       })
        //     );
        //   }
        // }
      });

    } else {
      this.foodChainForm = new FormGroup(
        {
          'id': new FormControl(foodChainId),
          'foodChainName': new FormControl(foodChainName, Validators.required),
          'foodChainLogoURL': new FormControl(foodChainImagePath, Validators.required),
          'description': new FormControl(foodChainDescription, Validators.required),
          //  'ingredients': recipeIngredients
        }
      );
    }


  }

  upload(files: any) {
    if (files.length === 0)
      return;
    const formData = new FormData();

    formData.append(files[0].name, files[0]);

    return this.httpClient.post<string>("http://localhost:5000/api/FoodChain/Image", formData)
      .subscribe(res => {
        // res;
        this.data = res;
        let dataURL = 'http://localhost:5000/Images/' + this.data.fileName as string;
        this.foodChainForm.get("foodChainLogoURL")?.setValue(dataURL, { emitEvent: false });
      });
  }
  onCancelFoodChainManage() {
    this.editMode = false;
    this.foodChainForm.reset();
    this.router.navigate(['/foodchains'], { relativeTo: this.route });
  }

  onSubmit() {
    if (this.editMode) {
      // this.recipeService.updateRecipe(this.id, this.recipeForm.value )
      this.store.dispatch(new FoodChainActions.UpdateFoodChain({ id: this.id, newFoodChain: this.foodChainForm.value }))
    }
    else {
      //  this.recipeService.addRecipe(this.recipeForm.value);
      this.store.dispatch(new FoodChainActions.AddFoodChain(this.foodChainForm.value));
    }
    this.onCancelFoodChainManage();
  }
}
