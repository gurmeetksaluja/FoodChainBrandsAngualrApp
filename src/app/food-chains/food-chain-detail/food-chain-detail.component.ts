import { Component, Input, OnInit } from '@angular/core';
import { FoodChain } from '../food-chain.model';

@Component({
  selector: 'app-food-chain-detail',
  templateUrl: './food-chain-detail.component.html',
  styleUrls: ['./food-chain-detail.component.css']
})
export class FoodChainDetailComponent implements OnInit {
  @Input() foodChainDetail:FoodChain;
  @Input() index:number
  constructor() { }

  ngOnInit(): void {
  }

}
