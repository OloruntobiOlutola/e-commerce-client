import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { enviroment } from "@env/enviroment.dev";
import { Observable } from "rxjs";
import { User } from "../models/user";

const apiUrl = enviroment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http : HttpClient) { }
  
  getUsers() : Observable<User[]> {
    return this.http.get<User[]>(apiUrl + '/users');
  }

  getUser(userId : string) : Observable<User> {
    return this.http.get<User>(apiUrl + '/users/'+userId);
  }

  createUser(user : User) : Observable<User> {
    return this.http.post<User>(apiUrl + '/users', user);
  }

  deleteUser(userId : string) : Observable<User> {
    return this.http.delete<User>(apiUrl + '/users/'+userId);
  }

  updateUser(userId : string, user : User) : Observable<User> {
    return this.http.put<User>(apiUrl + '/users/'+userId, user);
  }

}