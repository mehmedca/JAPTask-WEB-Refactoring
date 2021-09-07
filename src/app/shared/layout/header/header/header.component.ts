// import { Component, OnInit } from '@angular/core';

import { Component, OnInit } from '@angular/core';
// import { AccountService } from '../_services/account.service';
import { Observable } from 'rxjs';
// import { User } from '../_models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  model: any = {}

  // constructor(public accountService: AccountService) { }
  constructor(private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  login() {
    this.http.post("http://localhost:25398/auth/login", this.model).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

  // logout() {
  //   this.accountService.logout();
  // }
}
