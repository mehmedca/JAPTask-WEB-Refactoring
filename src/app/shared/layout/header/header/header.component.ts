import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../../../../core/_services/auth.service';
import { LoginModel } from '../../../../core/_models/auth/login';
import { TokenModel } from 'src/app/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  model: LoginModel = {username: "", password: ""}

  constructor(private router: Router, public accountService: AuthService) {
   }

  ngOnInit(): void {
    // this.accountService.currentUser.subscribe(response => console.log(response));
  }

  login() {
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl('/movies');
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/')
  }

}
