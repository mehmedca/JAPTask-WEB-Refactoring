import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
// import {FileUploadModule} from 'ng2-file-upload';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
// import { TimeagoModule } from 'ngx-timeago';

import { HeaderComponent } from "./layout/header/header/header.component";
import { LoaderComponent } from "./loader/loader/loader.component";
import { HasRoleDirective } from "../core/_directives/has-role.directive";
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LoaderComponent,
    HasRoleDirective,
    ConfirmDialogComponent,
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
    HeaderComponent,
    LoaderComponent,
    HasRoleDirective,
    BsDropdownModule,
    TabsModule,
    BsDatepickerModule,
    PaginationModule,
    ButtonsModule,
  ]
})
export class SharedModule {}
