import { User } from './../../models/user';
import { AccountService } from './../../services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  {
  user: User;

  constructor(private accountService: AccountService) {
    // this.user = this.accountService.userValue;
   }


  

}
