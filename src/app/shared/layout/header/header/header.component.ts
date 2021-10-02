import { take } from 'rxjs/operators';
import { TokenModel } from './../../../../core/models/tokenmodel';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../../core/services/auth.service';

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

  ngOnInit(): void {
    console.log('Token expiration: ' + this.user?.validTo);
    this.checkIsTokenExpired();
  }

  checkIsTokenExpired() {
    let tokenDate = this.user?.validTo;
    if (tokenDate != undefined) {
      if (!this.validateTokenDate(tokenDate)) {
        this.logout();
      }
    } else {
      this.logout();
    }
  }

  //Token is valid for 5 hours
  validateTokenDate(tokenDate: Date): Boolean {
    let dateNow = new Date();
    let tokenDateStr = tokenDate.toString();
    let tokenDateString = tokenDateStr.substring(0, tokenDateStr.indexOf('T'));
    let dateArr = tokenDateString.split('-');
    let timeInt = Number.parseInt(tokenDateStr.substring(tokenDateStr.indexOf('T'), 2));
    if (Number.parseInt(dateArr[1]) < dateNow.getMonth() + 1) {
      return false;
    }
    if (
      Number.parseInt(dateArr[1]) === dateNow.getMonth() + 1 &&
      Number.parseInt(dateArr[2]) < dateNow.getDate()
    ) {
      return false;
    }
    if (
      Number.parseInt(dateArr[1]) === dateNow.getMonth() + 1 &&
      Number.parseInt(dateArr[2]) === dateNow.getDate()
    ) {
      if (dateNow.getHours() > timeInt) {
        return false;
      }
    }
    return true;
  }

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
