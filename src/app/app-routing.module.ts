import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from './core/_guards/admin.guard';
import { AuthGuard } from './core/_guards/auth.guard';
import { PreventUnsavedChangesGuard } from './core/_guards/prevent-unsaved-changes.guard';
import { ActorDetailComponent } from './feature/actors/actor-detail/actor-detail.component';
import { ActorEditComponent } from './feature/actors/actor-edit/actor-edit.component';
import { ActorListComponent } from './feature/actors/actor-list/actor-list.component';
import { AdminPanelComponent } from './feature/admin/admin-panel/admin-panel.component';
import { NotFoundComponent } from './feature/errors/not-found/not-found.component';
import { ServerErrorComponent } from './feature/errors/server-error/server-error.component';
import { MovieDetailComponent } from './feature/movies/movie-detail/movie-detail.component';
import { MovieEditComponent } from './feature/movies/movie-edit/movie-edit.component';
import { MovieListComponent } from './feature/movies/movie-list/movie-list.component';
import { MovieRatingsListComponent } from './feature/movies/movie-ratings-list/movie-ratings-list.component';
import { UserEditComponent } from './feature/users/user-edit/user-edit.component';
import { HomeComponent } from './feature/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'movies/edit/:id',
        component: MovieEditComponent,
        canDeactivate: [PreventUnsavedChangesGuard],
      },
      { path: 'movies/ratings/:id', component: MovieRatingsListComponent },
      { path: 'users/edit', component: UserEditComponent },
      { path: 'actors/edit/:id', component: ActorEditComponent },
      {
        path: 'admin',
        component: AdminPanelComponent,
        canActivate: [AdminGuard],
      },
    ],
  },
  { path: 'movies/:id', component: MovieDetailComponent },
  { path: 'movies', component: MovieListComponent },
  { path: 'actors', component: ActorListComponent },
  { path: 'actors/:id', component: ActorDetailComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
