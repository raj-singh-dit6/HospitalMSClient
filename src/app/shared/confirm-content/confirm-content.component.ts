import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-content',
  templateUrl: './confirm-content.component.html',
  styleUrls: ['./confirm-content.component.scss']
})
export class ConfirmContentComponent implements OnInit {

  constructor(public activeModal:NgbActiveModal) { }

  ngOnInit() {
  }

}
