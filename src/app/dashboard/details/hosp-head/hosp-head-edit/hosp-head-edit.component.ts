import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HeadService } from '../../../../services/head.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Head } from '../../../../model/head.model';
import { User } from '../../../../model/user.model';
import { HospitalService } from '../../../../services/hospital.service';
import { Hospital } from '../../../../model/hospital.model';

@Component({
  selector: 'app-hosp-head-edit',
  templateUrl: './hosp-head-edit.component.html',
  styleUrls: ['./hosp-head-edit.component.scss']
})
export class HospHeadEditComponent implements OnInit {
  @Input() id: any;
  @Input() id2: any;
  hospitals:Hospital[];
  editMode= false;
  headForm: FormGroup;
  constructor(private headService: HeadService,
     public activeModal: NgbActiveModal,private formBuilder:FormBuilder,private hospitalService:HospitalService) { }

  ngOnInit() {
    this.editMode=this.id!=null && this.id!='';
    this.hospitalService.getHospitals().subscribe(result=>{
      if(result && result.total){
        this.hospitals=result.data;
      }
    });
    this.initForm();
  }

  private initForm() {
    this.headForm = this.formBuilder.group({});
    let firstName = '';
    let lastName = '';
    let address = '';
    let dob :Date;
    let contact: number;
    let hospital: number;
    let email = '';
    if (this.editMode) {
      let head: Head;
      this.headService.getHead(this.id).subscribe(result => {
        if(result && result.total!=0)
        {
          head = result.data
          firstName = head.user.firstName;
          lastName = head.user.lastName;
          address = head.user.address;
          email = head.user.email;
          contact = head.user.contact;
          hospital = head.hospital.id;
            
          this.createForm(firstName,lastName,address,dob,email,contact,hospital);
        }
      });
    }else{
        this.createForm();
    }
  }
  
  createForm(firstName:any='',lastName:any='',address:any='',dob:any='',email:any='',contact:any='',hospital:any=this.id2,){

    this.headForm = this.formBuilder.group({
      'firstName': new FormControl(firstName, Validators.required),
      'lastName': new FormControl(lastName),
      'hospital': new FormControl(hospital, Validators.required),
      'address': new FormControl(address, Validators.required),
      'email': new FormControl(email, Validators.required),
      'contact': new FormControl(contact, [Validators.required,
                         Validators.pattern(/^[1-9]+[0-9]*$/)]),   
    });
  }

  onSubmit() {
    const hospId=this.headForm.get('hospital').value;
    const hospital= this.hospitals.find(x=>x.id==hospId);
    const updateHead:any=this.headForm.value;
    const user:User= new User(null,null,updateHead.firstName,updateHead.lastName,updateHead.email,null,hospital,updateHead.address,updateHead.contact);
    const head:Head=new Head(this.id,user,hospital);
    if (this.editMode) {
      this.headService.updateHead(head).subscribe(result => {
        if (result.success) {
          this.headService.getHeadByHospital(this.id2).subscribe(result=>{
            if(result && result.total!=0)
            {
              let head:Head=result.data;
              this.headService.headChanged.next(head);
            }
          });
        }
      });
    } else {
      this.headService.addHead(head).subscribe(result => {
        if (result.success) {
          this.headService.getHeadByHospital(this.id2).subscribe(result=>{
            if(result && result.total!=0)
            {
              let head:Head=result.data;
              this.headService.headChanged.next(head);
            }
          });
        }      
      });
    }
    this.activeModal.close();
  }


}

