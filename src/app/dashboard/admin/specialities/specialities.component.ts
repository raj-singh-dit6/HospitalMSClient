import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { SpecialityEditComponent} from './speciality-edit/speciality-edit.component';

@Component({
  selector: 'app-specialities',
  templateUrl: './specialities.component.html',
  styleUrls: ['./specialities.component.scss']
})
export class SpecialitiesComponent implements OnInit {

  constructor(private modalService:ModalService) { }

  ngOnInit() {
  
  }

  onNewSpeciality()
  {
     this.modalService.open(SpecialityEditComponent,'')
  }
}
