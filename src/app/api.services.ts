import { environment } from '../environments/environment';

export const API = {
    GET_SERVER_CONNECTION: environment.apiUrl + '/server',
    LOGIN: environment.apiUrl + '/login',
    ADD_NEW_USER: environment.apiUrl + '/addNewUser',
    GET_USERS: environment.apiUrl + '/getUsers',
    ADD_NEW_GROUP: environment.apiUrl + '/addNewGroup',
    GET_GROUPS: environment.apiUrl + '/getGroups'
}