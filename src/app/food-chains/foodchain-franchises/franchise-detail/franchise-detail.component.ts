import { Component, Input, OnInit } from '@angular/core';
import { Franchise } from '../franchise.model';

@Component({
  selector: 'app-franchise-detail',
  templateUrl: './franchise-detail.component.html',
  styles: [
  ]
})
export class FranchiseDetailComponent implements OnInit {
  @Input() franchiseDetail:Franchise;
  @Input() index:number
  constructor() { }

  ngOnInit(): void {
  }

}
