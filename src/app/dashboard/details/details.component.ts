import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  hospitalId:string;
  
  constructor(route : ActivatedRoute)
  {
    this.hospitalId = route.snapshot.paramMap.get('hospitalId');
  }

  ngOnInit() {
  }

}
