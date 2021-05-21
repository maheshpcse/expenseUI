import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  fullname: any = null;
  username: any = null;
  email: any = null;
  password: any = null;
  mobile: any = null;
  profile: any = null;
  formData: any = new FormData();
  @ViewChild('usersForm', { static: false }) usersFormRef: NgForm;
  editItem: any = {};
  viewType: any = 'table';
  public sortBy: any = '';
  public sortOrder: any = 'asc';
  public rowsOnPage: any = 10;
  public rowsOnPageSet: any = [5, 10, 25];
  pager: any = {};
  page: any = 1;
  count: any = 0;
  searchEnable: any = false;
  filterQuery: any = '';
  spinner: any = false;
  usersList: any = [];
  rows: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(
    private router: Router,
    public authService: AuthService,
    public toastr: ToastrManager
  ) { }

  ngOnInit() {
    this.spinner = true;
    this.getUsersList();
  }

  generateCode() {
    this.password = `user${Math.abs(Math.round(Math.random() * 1000))}`;
  }

  search() {
    this.searchEnable = true;
    this.getUsersList();
  }

  pageChanged(event: any) {
    console.log(event);
    this.page = event;
    this.getUsersList();
  }

  getUsersList() {
    this.spinner = true;
    const userPayload: any = {
      limit: Number(this.rowsOnPage),
      page: Number(this.page),
      query: this.filterQuery
    };
    console.log('Post payload to get users list', userPayload);
    this.authService.getUsers(userPayload).subscribe((response: any) => {
      console.log('Ger users list response', response);
      if (response.success) {
        this.usersList = response.data.data;
        this.count = response.data.count;
        this.createPager();
      } else {
        this.toastr.errorToastr(response.message);
      }
      this.spinner = false;
    }, (error: any) => {
      this.toastr.errorToastr('Network failed, Please try again.');
      this.spinner = false;
    });
  }

  createPager() {
    this.pager.startCount = this.usersList.length > 0 && Number(this.page) === 1 ? 1 : this.usersList.length > 0 ? (Number(this.rowsOnPage) * Number(this.page - 1)) + 1 : 0;
    this.pager.endCount = Number(this.rowsOnPage) === this.usersList.length ? Number(this.rowsOnPage) * Number(this.page) : Number(this.count);
    console.log(this.pager);
  }

  onSelectFile(event: any) {
    console.log(event);
  }

  saveUserForm() {
    const userPayload: any = {
      user_id: this.editItem.user_id ? this.editItem.user_id : null,
      fullname: this.fullname,
      username: this.username,
      email: this.email,
      password: this.password,
      mobile: this.mobile.toString(),
      profile: null,
      role: this.editItem.role ? this.editItem.role : 'user',
      status: this.editItem.status ? this.editItem.status : 1
    };
    console.log('Post payload to add new user', userPayload);
    this.authService.addNewUser(userPayload).subscribe((response: any) => {
      console.log('Get response of add new user', response);
      if (response.success) {
        this.toastr.successToastr(response.message);
        this.resetForm();
      } else {
        this.toastr.errorToastr(response.message);
      }
    }, (error: any) => {
      this.toastr.errorToastr('Network failed, Please try again.');
    });
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  resetFilters() {
    this.rowsOnPage = 10;
    this.page = 1;
    this.pager = {};
    this.count = 0;
    this.filterQuery = '';
    this.searchEnable = false;
    this.getUsersList();
  }

  resetForm() {
    this.viewType = 'table';
    if (this.usersFormRef) {
      this.usersFormRef.reset();
    }
    this.username = null;
    this.password = null;
    this.rowsOnPage = 10;
    this.page = 1;
    this.pager = {};
    this.count = 0;
    this.filterQuery = '';
    this.searchEnable = false;
    this.getUsersList();
  }

  onSelectEditUser(item: any) {
    console.log('Selecte item isss', item);
    this.viewType = 'update';
    this.editItem = item;
    this.fullname = item.fullname;
    this.username = item.username;
    this.email = item.email;
    this.password = item.password;
    this.mobile = Number(item.mobile);
  }

}
