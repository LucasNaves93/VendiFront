
import { AccountService } from './../../services/account.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup
  submitted = false;
  constructor(
    private router: Router,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  // Chamar formulario
  get f() { return this.formLogin.controls }

  onSubmit() {
    {
      this.submitted = true;


      // stop here if form is invalid
      if (this.formLogin.invalid) {
          return;
      }


      this.accountService.login(this.f.email.value, this.f.password.value)
          .pipe(first())
          .subscribe({
              next: () => {
                  // get return url from query parameters or default to home page
                  const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
                  this.router.navigateByUrl(returnUrl);
              },

          });
  }
  }

}
