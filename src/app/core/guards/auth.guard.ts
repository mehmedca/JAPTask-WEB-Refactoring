import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { TokenModel } from '../models/tokenmodel';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accountService: AuthService, private toastr: ToastrService) {}

  canActivate(): Observable<boolean> {
    return this.accountService.currentUser.pipe(
      map((user: TokenModel | null) => {
        if (user) return true;

        this.toastr.error('You need to be authenticated in order to access this area!')
        return false;
      })
    )
  }
  
}