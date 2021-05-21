import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ng6-toastr-notifications';
import { MyDatePickerModule } from 'mydatepicker';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { UserFormComponent } from './user-form/user-form.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { GroupFormComponent } from './group-form/group-form.component';
import { AddUserComponent } from './user-form/add-user/add-user.component';
import { GoogleFormsComponent } from './google-forms/google-forms.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { FooterNavComponent } from './footer-nav/footer-nav.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { HistoryComponent } from './history/history.component';
import { DataTableModule } from "angular-6-datatable";
import { ChatBoatComponent } from './chat-boat/chat-boat.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { LoginComponent } from './access/login/login.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { ProfileComponent } from './admin/profile/profile.component';
import { SettingsComponent } from './admin/settings/settings.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ExpenseFormComponent,
    UserFormComponent,
    NotFoundComponent,
    GroupFormComponent,
    AddUserComponent,
    GoogleFormsComponent,
    HeaderNavComponent,
    FooterNavComponent,
    SideNavComponent,
    HistoryComponent,
    ChatBoatComponent,
    LoginComponent,
    ProfileComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    ToastrModule.forRoot(),
    MyDatePickerModule,
    NgxMyDatePickerModule.forRoot(),
    AngularMultiSelectModule,
    AppRoutingModule,
    AutocompleteLibModule,
    DataTableModule,
    NgxPaginationModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
