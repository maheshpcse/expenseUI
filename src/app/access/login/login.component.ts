import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthService } from 'src/app/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: any = null;
  password: any = null;
  @ViewChild('loginForm', { static: false }) loginFormRef: NgForm;
  errorMessage: any = '';

  constructor(
    public router: Router,
    public authService: AuthService,
    public toastr: ToastrManager
  ) { }

  ngOnInit() {
  }

  onKeyPress() {
    this.errorMessage = '';
  }

  onKeyInput() {
    this.errorMessage = '';
  }

  userLogin() {
    if (!this.username && !this.password) {
      this.errorMessage = 'Username and Password is required.';
      return;
    }
    if (!this.username) {
      this.errorMessage = 'Username is required.';
      return;
    }
    if (!this.password) {
      this.errorMessage = 'Password is required.';
      return;
    }
    const userPayload: any = {
      username: this.username,
      password: this.password
    }
    console.log('Post payload to user login', userPayload);
    this.authService.userLogin(userPayload).subscribe((response: any) => {
      console.log('Get user login response', response);
      if (response.success) {
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('userid', response.data.user_id);
        sessionStorage.setItem('fullname', response.data.fullname);
        sessionStorage.setItem('username', response.data.username);
        sessionStorage.setItem('email', response.data.email);
        sessionStorage.setItem('mobile', response.data.mobile);
        sessionStorage.setItem('profile', response.data.profile);
        sessionStorage.setItem('role', response.data.role);
        sessionStorage.setItem('status', response.data.status);
        sessionStorage.setItem('group_id', response.data.group_id);
        sessionStorage.setItem('created_at', moment(response.data.created_at).format('YYYY-MM-DD HH:mm:ss'));
        sessionStorage.setItem('updated_at', moment(response.data.updated_at).format('YYYY-MM-DD HH:mm:ss'));
        this.toastr.successToastr(response.message);
        this.router.navigate(['/home']);
      } else {
        this.toastr.errorToastr(response.message);
        this.errorMessage = response.message;
      }
      this.resetForm();
    }, (error: any) => {
      this.toastr.errorToastr('Network failed, Please try again.');
      this.resetForm();
    });
  }

  resetForm() {
    if (this.loginFormRef) {
      this.loginFormRef.reset();
    }
    this.username = null;
    this.password = null;
  }

}
