
import { AccountService } from './../../services/account.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];

  formLogin: FormGroup
  submitted = false;
  constructor(
    private router: Router,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private tokenStorage: TokenStorageService

  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    this.formLogin = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  // Chamar formulario
  get f() { return this.formLogin.controls }

  // onSubmit(){
  //   this.submitted = true;

  //     if (this.formLogin.invalid) {
  //         return;
  //     }

  //   this.accountService.login(this.f.email.value, this.f.password.value).subscribe(
  //     data => {
  //       this.tokenStorage.saveToken(data.token);
  //       this.tokenStorage.saveUser(data);

  //       this.isLoginFailed = false;
  //       this.isLoggedIn = true;
  //       this.roles = this.tokenStorage.getUser().roles;

  //     },
      
  //   );
  // }

  // Realizar Login
  onSubmit(){
    this.submitted = true;
      if (this.formLogin.invalid) {
          return;
      }


    if(this.formLogin.valid){
      this.accountService.login(this.f.email.value, this.f.password.value)
        .subscribe(res=>{
        console.log(res)
        localStorage.setItem('token', res.token)
        // localStorage.setItem('nome', res.nome)
        // localStorage.setItem('email', res.email)
        this.router.navigate(['/dashboard'])
      },
      err => console.log(err)
      )
    }
  }

  // onSubmit() {
  //   {
  //     this.submitted = true;


  //     // stop here if form is invalid
  //     if (this.formLogin.invalid) {
  //         return;
  //     }


  //     this.accountService.login(this.f.email.value, this.f.password.value)
  //         .pipe(first())
  //         .subscribe({
  //             next: () => {
  //                 // get return url from query parameters or default to home page
  //                 const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  //                 this.router.navigateByUrl(returnUrl);
  //             },

  //         });
  // }
  // }

}
