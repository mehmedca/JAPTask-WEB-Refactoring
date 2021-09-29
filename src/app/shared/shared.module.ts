import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
// import {FileUploadModule} from 'ng2-file-upload';
// import { TimeagoModule } from 'ngx-timeago';

import { HeaderComponent } from './layout/header/header/header.component';
import { LoaderComponent } from './loader/loader/loader.component';
import { HasRoleDirective } from '../core/directives/has-role.directive';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DateInputComponent } from '../core/forms/date-input/date-input.component';
import { TextInputComponent } from '../core/forms/text-input/text-input.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { UnderConstructionComponent } from './errors/under-construction/under-construction.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LoaderComponent,
    HasRoleDirective,
    ConfirmDialogComponent,
    DateInputComponent,
    TextInputComponent,
    NotFoundComponent,
    ServerErrorComponent,
    UnderConstructionComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    TabsModule.forRoot(),
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HeaderComponent,
    LoaderComponent,
    HasRoleDirective,
    BsDropdownModule,
    TabsModule,
    BsDatepickerModule,
    PaginationModule,
    ButtonsModule,
    DateInputComponent,
    TextInputComponent,
    NgbRating,
  ],
})
export class SharedModule {}
