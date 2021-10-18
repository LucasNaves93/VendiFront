import { AccountService } from './../../services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  constructor(
    public accountService: AccountService,
  ) { 
  }



  // logout(){
  //   this.accountService.logout();
    
  // }

}
