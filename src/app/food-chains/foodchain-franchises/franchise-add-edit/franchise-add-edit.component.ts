import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromApp from '../../../store/app.reducer';
import { Franchise } from '../franchise.model';
import * as FranchiseActions from '../store/franchise.actions';
@Component({
  selector: 'app-franchise-add-edit',
  templateUrl: './franchise-add-edit.component.html',
  styles: [
  ]
})
export class FranchiseAddEditComponent implements OnInit, OnDestroy {
  id: number;
  franchiseForm: FormGroup;
  private storeSub: Subscription;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.initForm();
    });
  }
  private initForm() {
  //  console.log('Init Form Call');
    let franchiseArray = new FormArray([]);
    //this.store.dispatch(new FranchiseActions.LoadFranchises(this.id));
    //this.store.pipe(select(fromApp.appReducer.franchises))
    this.storeSub = this.store.select(franchises => franchises.franchises).pipe(map(franchiseState => {
     // console.log('in store sub');
      return franchiseState.franchise;//.filter((franchise, index) => {
      //   console
      //   return franchise.foodChainId === this.id;

      //  });
    })).subscribe(franchisesRes => {
      // const arrayControl = <FormArray>newForm.controls['formArray'];
      if (franchisesRes.length > 0) {
      //  console.log('franchise lisr', franchisesRes);
        for (let franchiseItem of franchisesRes) {
          franchiseArray.push(
            new FormGroup({
              id: new FormControl(franchiseItem.id),
              foodChainId: new FormControl(this.id),
              address: new FormControl(franchiseItem.address, [Validators.required, Validators.maxLength(500)]),
              city: new FormControl(franchiseItem.city, [Validators.required, Validators.maxLength(100)]),
              state: new FormControl(franchiseItem.state, [Validators.required, Validators.maxLength(100)]),
              country: new FormControl(franchiseItem.country, [Validators.required, Validators.maxLength(100)]),
              pinCode: new FormControl(franchiseItem.pinCode, [Validators.required, Validators.maxLength(20)])  // Validators.pattern(/^[1-9]+[0-9]*$/),
            }));


        }
      }
      else {
        franchiseArray.push(
          new FormGroup({
            id: new FormControl(0),
            foodChainId: new FormControl(this.id),
            address: new FormControl(null, [Validators.required, Validators.maxLength(500)]),
            city: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
            state: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
            country: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
            pinCode: new FormControl(null, [Validators.required, Validators.maxLength(20)])

          })
        );

      }

    });
   
    this.franchiseForm = new FormGroup(
      {
        formArray: franchiseArray
      }
    );
  }

  get franchiseControls() {
    return (this.franchiseForm.get('formArray') as FormArray).controls;
  }

  onCancelFranchiseAdd() {
    this.router.navigate(['../../franchise'], { relativeTo: this.route });
  }
  onDeleteFranchise(index: number) {
    const element = (<FormArray>this.franchiseForm.get('formArray')).at(index);
    if (element.value.id > 0) {
      if (confirm('Are you sure you want to delete this franchise?')) {
        (<FormArray>this.franchiseForm.get('formArray')).removeAt(index);
        this.store.dispatch(new FranchiseActions.DeleteFranchise(+element.value.id));
      }
    } else { (<FormArray>this.franchiseForm.get('formArray')).removeAt(index); }
  }

  onAddFranchiseCtrls() {
    (<FormArray>this.franchiseForm.get('formArray')).push(new FormGroup({
      id: new FormControl(0),
      foodChainId: new FormControl(this.id),
      address: new FormControl(null, [Validators.required, Validators.maxLength(500)]),
      city: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      state: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      country: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      pinCode: new FormControl(null, [Validators.required, Validators.maxLength(20)])

    }));
    //arrayControl.push(newGroup);
  }

  onSubmit() {
    const franchiseListSubmit: Franchise[] = [];
    for (let i = 0; i < (<FormArray>this.franchiseForm.get('formArray')).length; i++) {
      const element = (<FormArray>this.franchiseForm.get('formArray')).at(i);
      const franchiseEnity: Franchise = (<Franchise>element.value);
      franchiseListSubmit.push(franchiseEnity);
    }

    this.store.dispatch(new FranchiseActions.AddFranchise(franchiseListSubmit));
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }
}
