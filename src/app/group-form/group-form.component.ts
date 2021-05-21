import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css']
})
export class GroupFormComponent implements OnInit {

  userId: any = sessionStorage.getItem('user_id');
  groupProfile: any = null;
  groupName: any = null;
  groupUsers: any = [];
  @ViewChild('groupsForm', {static: false}) groupsFormRef: NgForm;
  dropdownList: any = [
    { id: 1, itemName: 'India' },
    { id: 2, itemName: 'Singapore' },
    { id: 3, itemName: 'Australia' },
    { id: 4, itemName: 'Canada' },
    { id: 5, itemName: 'South Korea' },
    { id: 6, itemName: 'Germany' },
    { id: 7, itemName: 'France' },
    { id: 8, itemName: 'Russia' },
    { id: 9, itemName: 'Italy' },
    { id: 10, itemName: 'Sweden' }
  ];;
  selectedItems: any = [];
  dropdownSettings: any = {
    singleSelection: false,
    text: 'Select Countries',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    classes: 'myclass custom-class',
    badgeShowLimit: 2
  };

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
  groupsList: any = [];
  rows: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(
    private router: Router,
    public authService: AuthService,
    public toastr: ToastrManager
  ) { }

  ngOnInit() {
    for (let i = 0; i < 10; i++) {
      this.groupsList.push({
        group_name: `test_group ${i + 1}`,
        status: Math.abs(Math.round(Math.random() * 999)) / 2 === 0 ? 'Active' : 'Inactive',
        created_at: `2021-01-${i + 1}`,
      });
    }

    this.spinner = true;
    this.getGroupsList();
  }

  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }

  search() {
    this.searchEnable = true;
    this.getGroupsList();
  }

  pageChanged(event: any) {
    console.log(event);
    this.page = event;
    this.getGroupsList();
  }

  getGroupsList() {
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
        this.groupsList = response.data.data;
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
    this.pager.startCount = this.groupsList.length > 0 && Number(this.page) === 1 ? 1 : this.groupsList.length > 0 ? (Number(this.rowsOnPage) * Number(this.page - 1)) + 1 : 0;
    this.pager.endCount = Number(this.rowsOnPage) === this.groupsList.length ? Number(this.rowsOnPage) * Number(this.page) : Number(this.count);
    console.log(this.pager);
  }

  onSelectFile(event: any) {
    console.log(event);
  }

  saveUserForm() {
    const userPayload: any = {
      group_id: null,
      profile_img: this.groupProfile,
      group_name: this.groupName,
      group_user: this.groupUsers,
      user_id: this.userId,
      status: 1
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
    this.getGroupsList();
  }

  resetForm() {
    if (this.groupsFormRef) {
      this.groupsFormRef.reset();
    }
    this.groupProfile = null;
    this.groupName = null;
    this.groupUsers = [];
    this.rowsOnPage = 10;
    this.page = 1;
    this.pager = {};
    this.count = 0;
    this.filterQuery = '';
    this.searchEnable = false;
  }

}
