import { take } from 'rxjs/operators';
import { TokenModel } from './../../../../core/_models/tokenmodel';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../../../../core/_services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: TokenModel | null = {
    photoUrl: '',
    roles: [],
    token: '',
    userId: '',
    username: '',
    validTo: new Date(),
  };
  constructor(private router: Router, public accountService: AuthService) {
    accountService.currentUser
      .pipe(take(1))
      .subscribe((res) => (this.user = res));
  }

  ngOnInit(): void {}

  checkIfUserHasRole(): boolean {
    if (this.user == null || this.user == undefined) return false;
    if (
      this.user.roles.indexOf('Admin') == -1 ||
      this.user.roles.indexOf('Moderator') == -1
    )
      return false;

    return true;
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
