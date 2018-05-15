import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HospitalsComponent } from './dashboard/admin/hospitals/hospitals.component';
import { OccupanciesComponent } from './dashboard/details/occupancies/occupancies.component';
import { UsersComponent } from './dashboard/details/users/users.component';
import { RoomsComponent } from './dashboard/details/rooms/rooms.component';
import { SpecialitiesComponent } from './dashboard/admin/specialities/specialities.component';
import { DetailsComponent } from './dashboard/details/details.component';
import { DoctorsComponent } from './dashboard/details/doctors/doctors.component';
import { PatientsComponent } from './dashboard/details/patients/patients.component';
import { HeadComponent } from './dashboard/head/head.component';
import { RoomDetailComponent } from './dashboard/head/room-detail/room-detail.component';
import { DoctorDetailComponent } from './dashboard/head/doctor-detail/doctor-detail.component';
import { TestReportsComponent } from './dashboard/doctor/test-reports/test-reports.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  {
    path: 'dashboard', 
    component: DashboardComponent, 
    children: [
      { path: 'admin', component: AdminComponent ,
          children: [
            {path :'hospitals' ,component:HospitalsComponent},
            {path :'specialities' ,component:SpecialitiesComponent}
          ]},
      {   path: 'details', component: DetailsComponent,
          children: [
            {path :'specialities' ,component:SpecialitiesComponent}
      ]},
    ]
  },
  { path: 'hospitals', component: HospitalsComponent },
  { path: 'dashboard/details/:hospitalId', component: DetailsComponent },
  { path: 'dashboard/room-detail/:roomId', component: RoomDetailComponent },
  { path: 'dashboard/doctor-detail/:doctorId', component: DoctorDetailComponent },
  { path: 'signin', component: SigninComponent },
  { path :'specialities' ,component:SpecialitiesComponent},
  { path :'doctors/:hospitalId' ,component:DoctorsComponent},
  { path :'patients/:hospitalId' ,component:PatientsComponent},
  { path: 'occupancies/:hospitalId', component: OccupanciesComponent },
  { path: 'rooms/:hospitalId', component: RoomsComponent },
  { path: 'users/:hospitalId', component: UsersComponent },
  { path: 'head/:hospitalId', component: HeadComponent },
  { path: 'test-reports/:patientId', component: TestReportsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
