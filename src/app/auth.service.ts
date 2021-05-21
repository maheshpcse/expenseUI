import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from './api.services';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  userLogin(data: any) {
    return this.http.post<any>(API.LOGIN, data);
  }

  getUserToken() {
    return sessionStorage.getItem('token');
  }

  getUserId() {
    return sessionStorage.getItem('userid');
  }

  getUserRole() {
    return sessionStorage.getItem('role');
  }

  getUserPayload() {
    var token = this.getUserToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else {
      return null;
    }
  }

  isLoggedIn(): boolean {
    var userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  addNewUser(data: any) {
    return this.http.post<any>(API.ADD_NEW_USER, data);
  }

  getUsers(data: any) {
    return this.http.post<any>(API.GET_USERS, data);
  }

  addNewGroup(data: any) {
    return this.http.post<any>(API.ADD_NEW_GROUP, data);
  }

  getGroups(data: any) {
    return this.http.post<any>(API.GET_GROUPS, data);
  }
}
