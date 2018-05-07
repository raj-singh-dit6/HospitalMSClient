import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControlName, Validators, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { OccupancyService } from '../../../../services/occupancy.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { Occupancy } from '../../../../model/occupany.model';

@Component({
  selector: 'app-occupancy-edit',
  templateUrl: './occupancy-edit.component.html',
  styleUrls: ['./occupancy-edit.component.scss']
})

export class OccupancyEditComponent implements OnInit {
  @Input() id:any;
  occupancyForm:FormGroup;
  editMode=false;
  constructor(public activeModal: NgbActiveModal,
    private formBuilder : FormBuilder,
    private occupancyService:OccupancyService,private router:Router) { }

  ngOnInit() {     
      this.editMode = (this.id!=null && this.id!='');
      this.initForm();   
  }

  private initForm(){
    this.occupancyForm= this.formBuilder.group({});

    if(this.editMode){
      let occupancy:any;

      this.occupancyService.getOccupancy(this.id).subscribe(result=>{
        if(result && result.total!=0)
        {
          occupancy=result.data;
          
          this.createForm(occupancy.type);
        }
      }); 
    } 
    else{
      this.createForm();
    }
  }

  createForm(type : any= ''):void{
    let formBuilder = this.formBuilder;
    this.occupancyForm= formBuilder.group({
      'type': formBuilder.control(type,Validators.required),
    })
  }

  onSubmit(){
    const updateOccupancy=this.occupancyForm.value;
    const occupancy:Occupancy=new Occupancy(this.id,updateOccupancy.type);
    if(this.editMode){

      this.occupancyService.updateOccupancy(occupancy).subscribe(result=>{
        if(result.success)
        {
          this.occupancyService.getOccupancies().subscribe((result)=>{
            if(result && result.total!=0)
            {
              let occupancies:Occupancy[]=result.data;
              this.occupancyService.occupanciesChanged.next(occupancies);
              ;
            }
          });
        }
      });
    }else{
      this.occupancyService.updateOccupancy(occupancy).subscribe(result=>{
        if(result.success)
        {
          this.occupancyService.getOccupancies().subscribe((result)=>{
            if(result && result.total!=0)
            {
              let occupancies:Occupancy[]=result.data;
              this.occupancyService.occupanciesChanged.next(occupancies);
              ;
            }
          });
        }
      });
    }
    this.activeModal.close();
  }

}
