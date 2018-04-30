import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RoleService } from '../../services/role.service';
import { Role } from '../../model/role.model';
import { HospitalService } from '../../services/hospital.service';
import { Hospital } from '../../model/hospital.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @Input() id:any;
  roles:Role[] ;
  hospitals:Hospital[];
  userForm:FormGroup;
  editMode = false;
  constructor(public activeModal: NgbActiveModal,private userService:UserService,private authService: AuthService,private roleService:RoleService, private hospitalService:HospitalService) { }

  ngOnInit() { 
    if(this.id!=""){
      this.editMode=true;
    } 
      this.roleService.getRoles() .subscribe((result) => {
        this.roles=result.data;
      });  

    this.hospitalService.getHospitals().subscribe((result)=>{ 
      this.hospitals=result.data;
    });
    this.initForm();
  }

  onSignup(form: NgForm) {
    if (this.editMode) {
      this.userService.updateUser(form);
    } else {
      this.userService.addUser(this.userForm.value);
    }
    
  }

  initForm(){
    if(this.editMode==true){
// debugger
    }else{
      this.userForm = new FormGroup({
        'userHospital': new FormControl('', Validators.required),
        'userRole': new FormControl('', Validators.required),
        'userName': new FormControl('', Validators.required),
        'firstName': new FormControl('', Validators.required),
        'lastName': new FormControl('',Validators.required),
        'contact': new FormControl('',[ Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/) ]),
        'email': new FormControl('',Validators.required),
        'password': new FormControl('',Validators.required),
        'confirmPassword': new FormControl('',Validators.required),
        'dob': new FormControl('',Validators.required),
      });
    } 
  }

}
