import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../_services/auth.service';
import { TokenModel } from '../_models/tokenmodel';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private accountService: AuthService, private toastr: ToastrService) { }

  canActivate(): Observable<boolean> {
    return this.accountService.currentUser.pipe(
      map((user: TokenModel | null) => {
        if (user?.roles.includes('Admin') || user?.roles.includes('Moderator')) {
          return true;
        }
        this.toastr.error('You cannot enter this area');
        return false;
      })
    )
  }

}