import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core';
import { LoginModel } from 'src/app/core/_models/auth/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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

}
