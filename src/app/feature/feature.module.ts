import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { MovieCardComponent } from './movies/movie-card/movie-card.component';
import { MovieDetailComponent } from './movies/movie-detail/movie-detail.component';
import { MovieEditComponent } from './movies/movie-edit/movie-edit.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ActorListComponent } from './actors/actor-list/actor-list.component';
import { ActorDetailComponent } from './actors/actor-detail/actor-detail.component';
import { ActorEditComponent } from './actors/actor-edit/actor-edit.component';
import { MovieRatingsListComponent } from './movies/movie-ratings-list/movie-ratings-list.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { SharedModule } from '../shared/shared.module';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    MovieListComponent,
    MovieCardComponent,
    MovieDetailComponent,
    MovieEditComponent,
    LoginComponent,
    RegisterComponent,
    ActorListComponent,
    ActorDetailComponent,
    ActorEditComponent,
    MovieRatingsListComponent,
    AdminPanelComponent,
    NotFoundComponent,
    ServerErrorComponent,
    UserEditComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  entryComponents: [ConfirmDialogComponent],
})
export class FeatureModule { }
