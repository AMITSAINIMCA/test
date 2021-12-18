import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserDetailsComponent } from './user-details/user-details.component';
const routes: Routes = [{ path: '',  redirectTo: '/login', pathMatch: 'full'}, 
{ path: 'login', component: LoginComponent, data: { title: 'Login'  } }, 
{ path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard'  } }, 
{ path: 'user/:id', component: UserDetailsComponent, data: { title: 'User Datails'  } }, 
{ path: '**', component: NotFoundComponent, data: { title: '404 Error',discription: 'Page Not found'  } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
