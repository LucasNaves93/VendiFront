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

  // registerUrl = "http://localhost:3001/user"
  // loginUrl = "http://localhost:3001/user"
  registerUrl = "http://localhost:4200/api/user/cadastro"
  loginUrl = "http://localhost:4200/api/user/login"
  userUrl = "http://localhost:4200/api/user"

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  public get userValue(): User {
    return this.userSubject.value;
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.registerUrl, user);

  }
  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(this.loginUrl, { email, password })
      .pipe(map(user => {
        // armazena token
        localStorage.setItem('user', JSON.stringify(user));

        return user;
      }));
  }

  logout() {

    localStorage.removeItem('user');

    this.router.navigate(['/login']);
  }





}

