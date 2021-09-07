import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/_guards/auth.guard';
import { PreventUnsavedChangesGuard } from './core/_guards/prevent-unsaved-changes.guard';

// const routes: Routes = [
//   {path: '', component: HomeComponent},
//   {
//     path: '',
//     runGuardsAndResolvers: 'always',
//     canActivate: [AuthGuard],
//     children: [
//       {path: 'movies', component: MovieListComponent},
//       {path: 'movies/:id', component: MovieDetailComponent},
//       {path: 'movies/edit', component: MovieEditComponent, canDeactivate: [PreventUnsavedChangesGuard]},
//       {path: 'movies/ratings/:id', component: MemberEditComponent, canDeactivate: [PreventUnsavedChangesGuard]},
//       {path: 'actors', component: ListsComponent},
//       {path: 'messages', component: MessagesComponent},
//       {path: 'admin', component: AdminPanelComponent, canActivate: [AdminGuard]},
//     ]
//   },
//   {path: 'not-found', component: NotFoundComponent},
//   {path: 'server-error', component: ServerErrorComponent},
//   {path: '**', component: NotFoundComponent, pathMatch: 'full'},
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
