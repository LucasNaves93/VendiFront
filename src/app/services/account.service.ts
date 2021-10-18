import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AccountService {


  registerUrl = "http://localhost:4200/api/user/cadastro"
  loginUrl = "http://localhost:4200/api/user/login"
  userUrl = "http://localhost:4200/api/user"

  // private userSubject: BehaviorSubject<User>;
  // public user: Observable<User>;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    // this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')!));
    // this.user = this.userSubject.asObservable();
  }

  // public get userValue(): User {
  //   return this.userSubject.value;

  // }

  

  register(user: User): Observable<User> {
    return this.http.post<User>(this.registerUrl, user);

  }
  


  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(this.loginUrl, { email, password })
  }
  
  loggedIn() {
    return !!localStorage.getItem('token')
  }
  
  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }

  getToken() {
    return localStorage.getItem('token')
  }




  // logout() {

  //   localStorage.removeItem('user');
    
  //   this.router.navigate(['/login']);
  // }

  // getAll() {
  //   return this.http.get<User[]>(this.userUrl);
  // }

  // getById(id: string) {
  //   return this.http.get<User>(`${this.userUrl}${id}`);
  // }



}

