import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodChainDetailComponent } from './food-chain-detail.component';

describe('FoodChainDetailComponent', () => {
  let component: FoodChainDetailComponent;
  let fixture: ComponentFixture<FoodChainDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodChainDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodChainDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
