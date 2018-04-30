import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
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

const appRoutes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  {
    path: 'recipe', 
    component: RecipesComponent, 
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent },
    ]
  },
  {
    path: 'dashboard', 
    component: DashboardComponent, 
    children: [
      { path: 'admin', component: AdminComponent ,
          children: [
            {path :'hospitals' ,component:HospitalsComponent},
            {path :'specialities' ,component:SpecialitiesComponent}
          ]},
      { path: 'details', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent },
    ]
  },
  { path: 'hospitals', component: HospitalsComponent },
  { path: 'dashboard/details/:hospitalId', component: DetailsComponent },
  { path: 'occupancies', component: OccupanciesComponent },
  { path: 'users', component: UsersComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'signin', component: SigninComponent },
  { path :'specialities' ,component:SpecialitiesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
