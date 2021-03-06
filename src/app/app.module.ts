import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthService } from './services/auth.service';
import { AdminComponent } from './dashboard/admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoleService } from './services/role.service';
import { HospitalService } from './services/hospital.service';
import { HeadComponent } from './dashboard/head/head.component';
import { PatientComponent } from './dashboard/patient/patient.component';
import { DoctorComponent } from './dashboard/doctor/doctor.component';
import { HospitalsComponent } from './dashboard/admin/hospitals/hospitals.component';
import { HospitalComponent } from './dashboard/admin/hospitals/hospital-list/hospital/hospital.component';
import { HospitalEditComponent } from './dashboard/admin/hospitals/hospital-edit/hospital-edit.component';
import { ModalService } from './services/modal.service';
import { OccupancyService } from './services/occupancy.service';
import { UserService } from './services/user.service';
import { OccupanciesComponent } from './dashboard/details/occupancies/occupancies.component';

import { OccupancyListComponent } from './dashboard/details/occupancies/occupancy-list/occupancy-list.component';
import { OccupancyEditComponent } from './dashboard/details/occupancies/occupancy-edit/occupancy-edit.component';
import { RoomsComponent } from './dashboard/details/rooms/rooms.component';
import { UsersComponent } from './dashboard/details/users/users.component';

import { RoomEditComponent } from './dashboard/details/rooms/room-edit/room-edit.component';
import { RoomListComponent } from './dashboard/details/rooms/room-list/room-list.component';

import { UserListComponent } from './dashboard/details/users/user-list/user-list.component';
import { UserEditComponent } from './dashboard/details/users/user-edit/user-edit.component';
import { HospitalListComponent } from './dashboard/admin/hospitals/hospital-list/hospital-list.component';
import { UserComponent } from './dashboard/details/users/user-list/user/user.component';
import { DetailsComponent } from './dashboard/details/details.component';
import { SpecialitiesComponent } from './dashboard/admin/specialities/specialities.component';
import { SpecialityListComponent } from './dashboard/admin/specialities/speciality-list/speciality-list.component';
import { SpecialityEditComponent } from './dashboard/admin/specialities/speciality-edit/speciality-edit.component';
import { Speciality } from './model/speciality.model';
import { SpecialityService } from './services/speciality.service';
import { RoomService } from './services/room.service';
import { PatientService } from './services/patient.service';
import { DoctorService } from './services/doctor.service';
import { DoctorsComponent } from './dashboard/details/doctors/doctors.component';
import { PatientsComponent } from './dashboard/details/patients/patients.component';
import { DoctorListComponent } from './dashboard/details/doctors/doctor-list/doctor-list.component';
import { DoctorEditComponent } from './dashboard/details/doctors/doctor-edit/doctor-edit.component';
import { KeysPipe } from './shared/keys.pipe';
import { DepartmentService } from './services/department.service';
import { PatientEditComponent } from './dashboard/details/patients/patient-edit/patient-edit.component';
import { PatientListComponent } from './dashboard/details/patients/patient-list/patient-list.component';
import { PatientStatus } from './model/patientStatus.model';
import { PatientStatusService } from './services/patientStatusService.service';

import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
import { FusionChartsModule } from 'angular4-fusioncharts';
import { SimpleChartComponent } from './dashboard/simple-chart/simple-chart.component';
import { PieChartComponent } from './dashboard/pie-chart/pie-chart.component';
import { ChartService } from './services/chart.service';
import { HeadService } from './services/head.service';
import { HospHeadComponent } from './dashboard/details/hosp-head/hosp-head.component';
import { HospHeadEditComponent } from './dashboard/details/hosp-head/hosp-head-edit/hosp-head-edit.component';
import { ConfirmContentComponent } from './shared/confirm-content/confirm-content.component';
import { ConfirmService } from './shared/confirm-content/confirm.service';
import { AssignDoctorComponent } from './dashboard/details/assign-doctor/assign-doctor.component';
import { RoomDetailComponent } from './dashboard/head/room-detail/room-detail.component';
import { DoctorDetailComponent } from './dashboard/head/doctor-detail/doctor-detail.component';
import { PatientDoctorService } from './services/patientDoctor.service';
import { AssignRoomComponent } from './dashboard/details/assign-room/assign-room.component';
import { LineChartComponent } from './dashboard/line-chart/line-chart.component';
import { DoctorPatientsComponent } from './dashboard/doctor/doctor-patients/doctor-patients.component';
import { AdmittPatientsComponent } from './dashboard/doctor/admitt-patients/admitt-patients.component';
import { TestService } from './services/test.service';
import { TestReportService } from './services/testReport.service';
import { TestReportsComponent } from './dashboard/doctor/test-reports/test-reports.component';
import { TestReportEditComponent } from './dashboard/doctor/test-reports/test-report-edit/test-report-edit.component';
import { TestReportListComponent } from './dashboard/doctor/test-reports/test-report-list/test-report-list.component';
import { ToastrModule } from 'ngx-toastr';
FusionChartsModule.fcRoot(FusionCharts, Charts, FintTheme);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    SignupComponent,
    SigninComponent,
    AdminComponent,
    DashboardComponent,
    HeadComponent,
    PatientComponent,
    DoctorComponent,
    HospitalComponent,
    HospitalsComponent,
    HospitalListComponent,
    HospitalEditComponent,
    OccupanciesComponent,
    OccupancyListComponent,
    OccupancyEditComponent,
    RoomsComponent,
    RoomEditComponent,
    RoomListComponent,
    UserComponent,
    UsersComponent,
    UserListComponent,
    UserEditComponent,
    DetailsComponent,
    SpecialitiesComponent,
    SpecialityEditComponent,
    SpecialityListComponent,
    DoctorsComponent,
    PatientsComponent,
    DoctorListComponent,
    DoctorEditComponent,
    KeysPipe,
    PatientEditComponent,
    PatientListComponent,
    SimpleChartComponent,
    PieChartComponent,
    HospHeadComponent,
    HospHeadEditComponent,
    ConfirmContentComponent,
    AssignDoctorComponent,
    RoomDetailComponent,
    DoctorDetailComponent,
    AssignRoomComponent,
    LineChartComponent,
    DoctorPatientsComponent,
    AdmittPatientsComponent,
    TestReportsComponent,
    TestReportEditComponent,
    TestReportListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    FusionChartsModule,
    NgbModule.forRoot(),
    ToastrModule.forRoot(),

    
  ],
  providers: [TestService,TestReportService,ConfirmService,ModalService,AuthService,ChartService,RoleService,HospitalService,OccupancyService,UserService,SpecialityService,RoomService,PatientService,DoctorService,DepartmentService,PatientStatusService,HeadService,PatientDoctorService ],
  
  
  entryComponents: [TestReportEditComponent,AdmittPatientsComponent,AssignRoomComponent,AssignDoctorComponent,ConfirmContentComponent,HospitalEditComponent,SignupComponent,OccupancyEditComponent,SpecialityEditComponent,DoctorEditComponent,PatientEditComponent,RoomEditComponent,HospHeadEditComponent],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
