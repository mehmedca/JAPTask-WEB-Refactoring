import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import {
  LoaderInterceptor,
  HttpErrorInterceptor,
  JwtInterceptor,
} from './interceptors';
import {
  AuthService,
  JwtService,
  LoaderService,
  UserService,
} from './services';
import { SharedModule } from '../shared/shared.module';

export const interceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
      progressAnimation: 'increasing',
    }),
  ],
  providers: [
    interceptorProviders,
    AuthService,
    JwtService,
    LoaderService,
    UserService,
  ],
  exports: [],
})
export class CoreModule {}
