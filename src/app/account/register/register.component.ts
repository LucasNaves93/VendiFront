import { AccountService } from './../../services/account.service';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formRegister: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.formRegister = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

  // Acessar o formulario
  get f() { return this.formRegister.controls; }

  onSubmit(){
    this.submitted = true;

        
        if (this.formRegister.invalid) {
            return;
        }

        this.accountService.register(this.formRegister.value)
            
            .subscribe({
              next: () =>{
              this.router.navigate(['../login'], { relativeTo: this.route });  
              }
            });
            
  }

}
