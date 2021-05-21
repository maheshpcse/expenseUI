import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './access/login/login.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { AuthGuardService } from './auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { GoogleFormsComponent } from './google-forms/google-forms.component';
import { GroupFormComponent } from './group-form/group-form.component';
import { HistoryComponent } from './history/history.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserFormComponent } from './user-form/user-form.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin/profile',
    canActivate: [AuthGuardService],
    component: ProfileComponent
  },
  {
    path: 'admin/settings',
    canActivate: [AuthGuardService],
    component: SettingsComponent
  },
  {
    path: 'home',
    canActivate: [AuthGuardService],
    component: DashboardComponent
  },
  {
    path: 'google-form',
    canActivate: [AuthGuardService],
    component: GoogleFormsComponent
  },
  {
    path: 'expense/add',
    canActivate: [AuthGuardService],
    component: ExpenseFormComponent
  },
  {
    path: 'groups/add',
    canActivate: [AuthGuardService],
    component: GroupFormComponent
  },
  {
    path: 'users/add',
    canActivate: [AuthGuardService],
    component: UserFormComponent
  },
  {
    path: 'history/view',
    canActivate: [AuthGuardService],
    component: HistoryComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
