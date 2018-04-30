import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthService } from './services/auth.service';
import { RecipeService } from './services/recipe.service';
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
import { OccupancyComponent } from './dashboard/details/occupancies/occupancy-list/occupancy/occupancy.component';
import { RoomComponent } from './dashboard/details/rooms/room-list/room/room.component';
import { UserComponent } from './dashboard/details/users/user-list/user/user.component';
import { DetailsComponent } from './dashboard/details/details.component';
import { AdminHeaderComponent } from './dashboard/admin/admin-header/admin-header.component';
import { SpecialitiesComponent } from './dashboard/admin/specialities/specialities.component';
import { SpecialityComponent } from './dashboard/admin/specialities/speciality/speciality.component';
import { SpecialityListComponent } from './dashboard/admin/specialities/speciality-list/speciality-list.component';
import { SpecialityEditComponent } from './dashboard/admin/specialities/speciality-edit/speciality-edit.component';
import { Speciality } from './model/speciality.model';
import { SpecialityService } from './services/speciality.service';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent,
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
    OccupancyComponent,
    OccupanciesComponent,
    OccupancyListComponent,
    OccupancyEditComponent,
    RoomComponent,
    RoomsComponent,
    RoomEditComponent,
    RoomListComponent,
    UserComponent,
    UsersComponent,
    UserListComponent,
    UserEditComponent,
    DetailsComponent,
    AdminHeaderComponent,
    SpecialitiesComponent,
    SpecialityComponent,
    SpecialityEditComponent,
    SpecialityListComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot()
    
  ],
  providers: [ModalService,AuthService,ShoppingListService,RecipeService,RoleService,HospitalService,OccupancyService,UserService,SpecialityService],
  entryComponents: [RecipeEditComponent,HospitalEditComponent,SignupComponent,OccupancyEditComponent,SpecialityEditComponent],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
